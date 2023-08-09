import { DocumentNode } from "graphql";

import { client } from "../../lib/apollo/client";
import delay from "../delay";
import { exceptionLog } from "../exceptionLog";

export type queryNode = DocumentNode;
/**
 * Количество элементов, возвращаемых после курсора
 * @default 10
 */
type FirstVariable = number;

type criticalVariables = {
  /**
   * Курсор, используется вместе с аргументом `first`
   * для указания места в наборе данных для получения данных.
   * @default ""
   */
  cursor?: string;

  first?: FirstVariable;
};
type CallbackFn<TData> = (data: TData) => Promise<void> | void;
export type PageInfo = {
  hasNextPage: boolean;
  endCursor: string;
};
type PageInfoCallback<TData> = (data: TData) => PageInfo;
type UpdatedVariablesCallback<TVariables> = () => TVariables;

export interface IRecursiveLoadParties<TData, TVariables> {
  /**
   * `GraphQL` запрос должен принимать переменные `cursor`, `first`.
   */
  query: queryNode;

  /**
   * Переменные передаваемые в GraphQL запрос
   */
  variables?: TVariables & criticalVariables;

  /**
   * Функция или асинхронная функция, выполняемая для каждой партии
   *
   * @param data
   */
  callbackFn: CallbackFn<TData>;

  /**
   * Функция, возвращающая объект pageInfo из GraphQL
   *
   * @param data
   */
  pageInfoCallback: PageInfoCallback<TData>;

  /**
   * Функция, возвращающая объект
   * обновленных и/или дополнительных переменных
   * для следующего GraphQL запроса
   */
  updatedVariablesCallback?: UpdatedVariablesCallback<
    Partial<TVariables> & Pick<criticalVariables, "first">
  >;

  /**
   * Задержка в (ms) перед запросом следующей партии
   *
   * @default 0
   */
  delayMS?: number;
}

export async function recursiveLoadParties<
  TData,
  TVariables = criticalVariables,
>(args: IRecursiveLoadParties<TData, TVariables>): Promise<void> {
  const {
    query,
    callbackFn,
    pageInfoCallback,
    updatedVariablesCallback,
    delayMS = 0,
  } = args;
  // Присваеваем default значение
  const first = args.variables?.first ?? 10;
  const variables = {
    cursor: "",
    ...args.variables,
    first,
  };

  try {
    const { data } = await client.query({
      query,
      variables,
    });

    await callbackFn(data);

    const pageInfo = pageInfoCallback(data);

    if (pageInfo.hasNextPage) {
      const newVariables = {
        ...variables,
        cursor: pageInfo.endCursor,
        ...updatedVariablesCallback?.(),
      } as TVariables & criticalVariables;

      await delay(delayMS).then(async () => {
        await recursiveLoadParties({ ...args, variables: newVariables });
      });
    }
  } catch (error) {
    exceptionLog(error);
  }
}
