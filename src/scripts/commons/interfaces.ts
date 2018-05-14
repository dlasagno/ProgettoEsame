import { TabController } from '../tab-window-scripts/tab-controller'

//Interface for properties
export interface Property<T> {
  name: string;
  description: string;
  value: T;
}


//Interface for tasks
export interface Task {

  title: string
  description: string

  wbs_graphics?: {
    color: string
  }

  gantt_graphics?:{
    
  }

  collapsed: boolean

  format?: string[]

  start_date: string
  end_date: string

  progress: number
  cost?: number
  appointee?: string

  extra_info?: {}

  children?: Task[]
  
}

//Class with static methods to work on tasks
export class Task {

  static getTaskById(task: Task, id: string): Task {
    if(id.length < 1)
      return task
    else {
      const ids: number[] = id.split('.').map(num => parseInt(num))
      task = task.children[ids[0] - 1]
      ids.shift()
      return this.getTaskById(task, ids.join('.'))
    }
  }

}


//Interface for tabs
export interface Tab {
  name: string
  icon: string
  menuItems: MenuItem[]
  view(tabController: TabController): Element
}


//Interface for tab menus
export interface MenuItem {
  name: string,
  action()
}

//Interface for tab buttons
export interface TabButton extends MenuItem {
  icon: string
}


const task: Task = {
  title: '',
  description: '',
  collapsed: false,
  start_date: '',
  end_date: '',
  progress: 0
}
