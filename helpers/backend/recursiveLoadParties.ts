/* eslint-disable no-console */
import { DocumentNode } from "graphql";

import { client } from "../../store/apollo-client";
import delay from "../delay";
import { exceptionLog } from "../exceptionLog";

export type queryNode = DocumentNode;
type criticalVariables<TVariables> = TVariables & {
  /**
   * @default ""
   */
  cursor?: string;

  /**
   * Количество элементов, возвращаемых после указываемого курсора
   * @default 10
   */
  first?: number;
};
type _callbackFn<TData> = (data: TData) => Promise<void>;
export type _pageInfo = {
  hasNextPage: boolean;
  endCursor: string;
};
type _pageInfoCallback<TData> = (data: TData) => _pageInfo;
type _updatedVariablesCallback<TVariables> = () => TVariables;

export interface IRecursiveLoadParties<TVariables, TData> {
  /**
   * GraphQL запрос
   */
  query: queryNode;

  /**
   * Переменные передаваемые в GraphQL запрос
   */
  variables: criticalVariables<TVariables>;

  /**
   * Асинхронная функция, выполняемая для каждой партии
   *
   * @param data
   */
  callbackFn: _callbackFn<TData>;

  /**
   * Функция, возвращающая объект pageInfo из GraphQL
   *
   * @param data
   */
  pageInfoCallback: _pageInfoCallback<TData>;

  /**
   * Функция, возвращающая объект
   * обновленных и/или дополнительных переменных
   * для следующего GraphQL запроса
   */
  updatedVariablesCallback?: _updatedVariablesCallback<TVariables>;

  /**
   * Задержка в (ms) перед запросом следующей партии
   *
   * @default 0
   */
  delayMS?: number;
}

export async function recursiveLoadParties<TVariables, TData>(
  args: IRecursiveLoadParties<TVariables, TData>,
): Promise<void> {
  const {
    query,
    callbackFn,
    pageInfoCallback,
    updatedVariablesCallback,
    delayMS = 0,
  } = args;
  const variables: criticalVariables<TVariables> = {
    cursor: "",
    first: 10,
    ...args.variables,
  };

  try {
    const { data } = await client.query({
      query,
      variables,
      fetchPolicy: "network-only",
    });

    await callbackFn(data);

    const pageInfo = pageInfoCallback(data);

    if (pageInfo.hasNextPage) {
      const newVariables = {
        ...variables,
        cursor: pageInfo.endCursor,
        ...updatedVariablesCallback?.(),
      };

      await delay(delayMS).then(async () => {
        await recursiveLoadParties({ ...args, variables: newVariables });
      });
    }
  } catch (error) {
    exceptionLog(error);
  }
}
