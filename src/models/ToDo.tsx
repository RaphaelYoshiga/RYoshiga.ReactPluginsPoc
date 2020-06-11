import { types, getSnapshot } from "mobx-state-tree"

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
        users: types.map(User),
        todos: types.map(Todo)
    })
    .actions(self => ({
        addTodo(id: string, name: string) {
            self.todos.set(id, Todo.create({ name }))
        }
    }))