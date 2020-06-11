import { types } from "mobx-state-tree"
import {values} from "mobx";

export const Todo = types
    .model({
        name: types.optional(types.string, ""),
        done: types.optional(types.boolean, false)
    })
    .actions(self => ({
        setName(newName: string) {
            self.name = newName
        },

        toggle() {
            self.done = !self.done
        }
    }))

export const User = types.model({
    name: types.optional(types.string, "")
})

export const RootStore = types
    .model({
        todos: types.array(Todo)
    })
    .views(self => ({
        get pendingCount() {
            return values(self.todos).filter(todo => !todo.done).length
        },
        get completedCount() {
            return values(self.todos).filter(todo => todo.done).length
        },
        getTodosWhereDoneIs(done: Boolean) {
            return values(self.todos).filter(todo => todo.done === done)
        }
    }))
    .actions(self => ({
        addTodo(id: string, name: string) {
            self.todos.push(Todo.create({ name }))
        }
    }))
