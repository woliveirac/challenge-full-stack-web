<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <student-form
          v-if="student"
          @form-submitted="handleFormSubmitted"
          :initialStudent="student"
          :beingEdited="true"
        ></student-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import StudentForm from "./StudentForm.vue";
import axios from "axios";

export default {
  name: "StudentEdit",

  components: {
    StudentForm,
  },

  data: () => ({
    student: null,
    alert: false,
  }),

  created() {
    this.getStudent();
  },

  methods: {
    getStudent() {
      const student_id = this.$route.params.id;
      axios
        .get("http://localhost:3333/students/" + student_id, {
          "Content-Type": "application/json",
        })
        .then((response) => this.handleGetStudent(response))
        .catch((error) => {
          console.error("There was an error!", error);
        });
    },
    handleGetStudent(response) {
      if (response.status !== 200) {
        this.handleRequestError(response); //todo
      }

      if (response.status === 200) {
        this.student = response.data;
      }
    },
    handleFormSubmitted(data) {
      const student_id = this.$route.params.id;
      axios
        .put("http://localhost:3333/students/" + student_id, data, {
          "Content-Type": "application/json",
        })
        .then((response) => this.handleUpdatedStudent(response))
        .catch((error) => {
          console.error("There was an error!", error);
        });
    },
    handleUpdatedStudent(response) {
      if (response.status !== 200) {
        this.handleRequestError(response); //todo
      }

      this.student = response.data;
      this.$router.push({ name: "students"});
    },
  },
};
</script>