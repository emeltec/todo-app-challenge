<template>
  <div>
    <v-divider :key="`${todo.uid}-divider`"></v-divider>
    <v-list-tile
      :key="todo.uid"
      class="todo-item"
      :class="{ editing: editing }"
    >
      <v-list-tile-action>
        <v-checkbox
          v-model="todo.done"
          @change="toggleTodo(todo)"
          color="primary"
          v-if="!editing"
        ></v-checkbox>
        <v-icon color="primary" v-else>edit</v-icon>
      </v-list-tile-action>
      <template v-if="!editing">
        <v-list-tile-content
          :class="{ 'primary--text': todo.done }"
          @dblclick="editing = true"
        >
          {{ todo.text }}
        </v-list-tile-content>
        <v-list-tile-action>
          <v-btn @click="removeTodo(todo)" color="red lighten-3" flat icon>
            <v-icon>close</v-icon>
          </v-btn>
        </v-list-tile-action>
      </template>
      <v-text-field
        :value="todo.text"
        @blur="doneEdit"
        @keyup.enter="doneEdit"
        @keyup.esc="cancelEdit"
        clearable
        color="primary"
        flat
        hide-details
        maxlength="1023"
        ref="input"
        solo
        autofocus
        v-else
      ></v-text-field>
    </v-list-tile>
  </div>
</template>

<script>
import vuex from 'vuex'

export default {
  name: "Todo",
  props: {
    todo: {
      text: ''
    },
  },

  data() {
    return {
      editing: false,
    };
  },

  methods: {
    ...vuex.mapActions([
      "toggleAll",
      "clearCompleted",
      "editTodo",
      "removeTodo",
      "toggleTodo",
    ]),

    doneEdit(e) {
      var value = e.target.value.trim()
      var todo = this.todo
      if (!value) {
        this.removeTodo(todo)
      } else if (this.editing) {
        this.editTodo({
          todo,
          value
        })
        this.editing = false
      }
    },

    cancelEdit () {
      this.editing = false
    },
  },
};
</script>