<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <student-form
          @form-submitted="handleFormSubmitted"
          :initialStudent="student"
          :beingEdited="false"
        ></student-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import StudentForm from "./StudentForm.vue";
import axios from "axios";

export default {
  name: "StudentNew",

  components: {
    StudentForm,
  },

  data: () => ({
    student: {
      name: null,
      email: null,
      cpf: null,
      ra: null,
    },
    alert: false,
  }),

  methods: {
    handleFormSubmitted(data) {
      axios
        .post("http://localhost:3333/students/", data, {
          "Content-Type": "application/json",
        })
        .then((response) => this.handleCreatedStudent(response))
        .catch((error) => {
          console.error("There was an error!", error);
        });
    },
    handleCreatedStudent(response) {
      if (response.status !== 200) {
        this.handleRequestError(response); //todo
      }

      this.student = response.data;
      this.$router.push({ name: "students"});
    },
  },
};
</script>