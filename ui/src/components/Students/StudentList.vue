<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1 class="text-h2">Alunos</h1>
      </v-col>
    </v-row>
    <v-row class="text-center">
      <v-col cols="12" md="6">
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field
      ></v-col>
      <v-col cols="12" md="6">
        <v-btn
          :to="{ name: 'student-new' }"
          class="float-right"
          color="primary"
        >
          Novo aluno
        </v-btn>
      </v-col>
      <v-col cols="12">
        <template>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5"
                >Tem certeza que você quer apagar esse registro?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete"
                  >Não</v-btn
                >
                <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                  >Sim</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-card>
            <v-data-table :headers="headers" :items="students" :search="search">
              <template v-slot:top>
                <v-toolbar flat> </v-toolbar>
              </template>
              <template v-slot:[`item.actions`]="{ item }">
                <v-icon small class="mr-2" @click="editItem(item)">
                  mdi-pencil
                </v-icon>
                <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
              </template>
            </v-data-table>
          </v-card>
        </template>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "StudentList",

  watch: {
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    this.getStudents();
  },

  data() {
    return {
      dialogDelete: false,
      deleteIndex: null,
      student: {
        name: "",
        email: "",
        ra: null,
        cpf: null,
      },
      search: "",
      headers: [
        {
          text: "Registro Acadêmico",
          align: "start",
          value: "ra",
        },
        { text: "Nome", value: "name" },
        { text: "CPF", value: "cpf" },
        { text: "Ações", value: "actions", sortable: false },
      ],
      students: [],
    };
  },

  methods: {
    editItem(item) {
      this.$router.push({ name: "student-edit", params: { id: item.id } });
    },

    deleteItem(item) {
      this.deleteIndex = item.id;
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      axios
      .delete("http://localhost:3333/students/" + this.deleteIndex , {
          "Content-Type": "application/json",
      })
      .then((response) => this.handleDeleteStudent(response))
      .catch((error) => {
          console.error("There was an error!", error);
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.deleteIndex = null;
      });
    },

    getStudents() {
      axios
        .get("http://localhost:3333/students", {
          "Content-Type": "application/json",
        })
        .then((response) => this.handleGetStudents(response))
        .catch((error) => {
          console.error("There was an error!", error);
        });
    },

    handleGetStudents(response) {
      if (response.status !== 200) {
        this.handleRequestError(response); //todo
      }
      this.students = response.data;
    },

    handleDeleteStudent(response) {
      if (response.status !== 204) {
        this.handleRequestError(response); //todo
      }

      this.closeDelete();
      this.getStudents();
    },
  },
};
</script>