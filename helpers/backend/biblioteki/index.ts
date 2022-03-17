interface IBibliotekiBase {
  address: string;
  email: string;
  name: string;
  point: any;
  shortname: string;
  id: string;
  telefon: string;
}

interface INode {
  menuOrder: number;
  bibliotekiBase: IBibliotekiBase;
  bibliotekiSchedule: {
    cleanupday: Array<string>;
    friday: string;
    holiday: string;
    isholiday: boolean;
    lunchbreak: Array<string>;
    monday: string;
    saturday: string;
    sunday: string;
    thursday: string;
    tuesday: string;
    wednesday: string;
  };
  bibliotekiScheduleAup: {
    cleanupdayaup: Array<string>;
    fridayaup: string;
    holidayaup: string;
    isholidayaup: boolean;
    lunchbreakaup: Array<string>;
    mondayaup: string;
    saturdayaup: string;
    sundayaup: string;
    thursdayaup: string;
    tuesdayaup: string;
    wednesdayaup: string;
  };
}

interface IPage {
  title: string;
  excerpt: string;
  children: {
    nodes: Array<INode>;
  };
}

// response
interface IScheduleNode {
  day: string;
  time: string;
  lunchBreak?: boolean;
  cleanupDay?: boolean;
}

interface ISchedule {
  schedule: Array<IScheduleNode> | null;
  scheduleAup: Array<IScheduleNode> | null;
}

interface INodes {
  order: number;
  name: string;
  address: string;
  shortName: string;
  id: string;
  email: string;
  point: any;
  telefon: string;
  scheduleDefault: ISchedule;
  scheduleSecondary: ISchedule;
}

const stringToObject = (str: string): any =>
  JSON.parse(
    `[${str.replaceAll("\r\n", "").replaceAll(",}", "}")}]`.replaceAll(
      "},]",
      "}]",
    ),
  );

const createScheduleDefault = (
  schedule: any,
  aup: string = "",
): IScheduleNode[] => {
  const res: IScheduleNode[] = [
    {
      day: "пн",
      time: schedule["monday" + aup],
    },
    {
      day: "вт",
      time: schedule["tuesday" + aup],
    },
    {
      day: "ср",
      time: schedule["wednesday" + aup],
    },
    {
      day: "чт",
      time: schedule["thursday" + aup],
    },
    {
      day: "пт",
      time: schedule["friday" + aup],
    },
    {
      day: "сб",
      time: schedule["saturday" + aup],
    },
    {
      day: "вс",
      time: schedule["sunday" + aup],
    },
  ];
  const lunchBreak = schedule["lunchbreak" + aup][0] === "false" ? false : true;
  const cleanupDay = schedule["cleanupday" + aup][0] === "false" ? false : true;

  if (lunchBreak) {
    res.push({
      lunchBreak,
      day: "Обед",
      time: schedule["lunchbreak" + aup][1],
    });
  }

  if (cleanupDay) {
    res.push({
      cleanupDay: cleanupDay,
      day: "Санитарный день",
      time: schedule["cleanupday" + aup][1],
    });
  }

  return res;
};

const transformObject = async (page: IPage): Promise<Object> => {
  const nodes: Array<INodes> = [];

  page.children.nodes.forEach((node: INode, index: number) => {
    const point = node.bibliotekiBase.point.split(",");
    nodes[index] = {
      order: node.menuOrder,
      name: node.bibliotekiBase.name,
      address: node.bibliotekiBase.address,
      shortName: node.bibliotekiBase.shortname,
      id: node.bibliotekiBase.id,
      email: node.bibliotekiBase.email,
      point: [parseFloat(point[0]), parseFloat(point[1])],
      telefon: stringToObject(node.bibliotekiBase.telefon),
      scheduleDefault: {
        schedule: createScheduleDefault(node.bibliotekiSchedule),
        scheduleAup: createScheduleDefault(node.bibliotekiScheduleAup, "aup"),
      },
      scheduleSecondary: {
        schedule:
          node.bibliotekiSchedule.isholiday === true
            ? stringToObject(node.bibliotekiSchedule.holiday)
            : null,
        scheduleAup:
          node.bibliotekiScheduleAup.isholidayaup === true
            ? stringToObject(node.bibliotekiScheduleAup.holidayaup)
            : null,
      },
    };
  });

  nodes.sort((a, b) => a.order - b.order);

  return {
    title: page.title,
    excerpt: page.excerpt,
    children: { nodes },
  };
};

export default transformObject;
