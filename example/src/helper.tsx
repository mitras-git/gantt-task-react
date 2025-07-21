import { Task } from "../../dist/types/public-types";

export function initTasks() {
  const currentDate = new Date();
  const tasks: Task[] = [
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 15),
      name: "Test Project",
      id: "ProjectSample",
      progress: 25,
      type: "project",
      hideChildren: false,
      displayOrder: 1,
      heirarchyLevel: 0,
    },
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 15),
      name: "Some Project under Test Project",
      id: "ProjectSampleunderTest",
      progress: 25,
      project: "ProjectSample",
      type: "project",
      hideChildren: false,
      displayOrder: 1,
      heirarchyLevel: 0,
    },
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
      end: new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        2,
        12,
        28
      ),
      name: "Idea",
      id: "Task 0",
      progress: 45,
      auctualStart: new Date(currentDate.getFullYear(), currentDate.getMonth(), 2),
      auctualEnd: new Date(currentDate.getFullYear(), currentDate.getMonth(), 4),
      createSplit: true,
      type: "task",
      project: "ProjectSampleunderTest",
      displayOrder: 2,
      heirarchyLevel: 0,
    },
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 2),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 4, 0, 0),
      name: "Research",
      id: "Task 1",
      progress: 100,
      dependencies: ["Task 0"],
      type: "task",
      project: "ProjectSampleunderTest",
      auctualStart: new Date(currentDate.getFullYear(), currentDate.getMonth(), 3),
      auctualEnd: new Date(currentDate.getFullYear(), currentDate.getMonth(), 6),
      createSplit: true,
      displayOrder: 3,
      heirarchyLevel: 0
    },
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 4),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 8, 0, 0),
      name: "Discussion with team",
      id: "Task 2",
      progress: 10,
      dependencies: ["Task 1"],
      type: "task",
      project: "ProjectSampleunderTest",
      displayOrder: 4,
      heirarchyLevel: 0
    },
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 8),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 9, 0, 0),
      name: "Developing",
      id: "Task 3",
      progress: 2,
      dependencies: ["Task 2"],
      type: "task",
      project: "ProjectSampleunderTest",
      displayOrder: 5,
      heirarchyLevel: 0
    },
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 8),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 10),
      name: "Review",
      id: "Task 4",
      type: "task",
      progress: 70,
      dependencies: ["Task 2"],
      project: "ProjectSampleunderTest",
      displayOrder: 6,
      heirarchyLevel: 0
    },
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 15),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 15),
      name: "Release",
      id: "Task 6",
      progress: currentDate.getMonth(),
      type: "milestone",
      dependencies: ["Task 4"],
      project: "ProjectSampleunderTest",
      displayOrder: 7,
      heirarchyLevel: 0
    },
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 18),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 19),
      name: "Party Time",
      id: "Task 9",
      progress: 0,
      isDisabled: true,
      type: "task",
      heirarchyLevel: 0
    },
  ];
  return tasks;
  // return hierarchyCalculation(tasks);
}

// export function hierarchyCalculation(tasks: Task[]): Task[] {
//   const taskMap: Map<string, Task> = new Map(tasks.map(task => [task.id, task]));

//   tasks.forEach(task => {
//     if (task.project) {
//       console.log("If level 1 triggered for task:", task.name);
//       const parentTask = taskMap.get(task.project);
//       if (parentTask) {
//         console.log("If level 2 triggered for task:", task.name);
//         task.heirarchyLevel = (parentTask.heirarchyLevel || 0) + 1;
//       }
//     } else {
//       console.log("Else 0 triggered for task:", task.name);
//       task.heirarchyLevel = 0;
//     }
//   });

//   return tasks;
// }
export function getStartEndDateForProject(tasks: Task[], projectId: string) {
  const projectTasks = tasks.filter(t => t.project === projectId);
  let start = projectTasks[0].start;
  let end = projectTasks[0].end;

  for (let i = 0; i < projectTasks.length; i++) {
    const task = projectTasks[i];
    if (start.getTime() > task.start.getTime()) {
      start = task.start;
    }
    if (end.getTime() < task.end.getTime()) {
      end = task.end;
    }
  }
  return [start, end];
}
