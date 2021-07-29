<template>
  <div>
    <h1 class="h1">Alunos - {{ beingEdited === true ? "Edição" : "Novo" }}</h1>
    <form>
      <v-text-field
        v-model="student.name"
        :error-messages="nameErrors"
        label="Name"
        required
        @input="v$.student.name.$touch()"
        @blur="v$.student.name.$touch()"
      ></v-text-field>
      <v-text-field
        v-model="student.email"
        :error-messages="emailErrors"
        label="E-mail"
        required
        @input="v$.student.email.$touch()"
        @blur="v$.student.email.$touch()"
      ></v-text-field>
      <v-text-field
        v-model="student.cpf"
        v-mask="'###.###.###-##'"
        :error-messages="cpfErrors"
        label="CPF"
        required
        :disabled="beingEdited === true"
        @input="v$.student.cpf.$touch()"
        @blur="v$.student.cpf.$touch()"
      ></v-text-field>
      <v-text-field
        v-model="student.ra"
        :error-messages="raErrors"
        :counter="15"
        label="Registro Acadêmico"
        type="number"
        onkeydown="return event.keyCode !== 69"
        required
        :disabled="beingEdited === true"
        @input="v$.student.ra.$touch()"
        @blur="v$.student.ra.$touch()"
      ></v-text-field>
      <v-btn class="mr-4" @click="submit"> Salvar </v-btn>
      <v-btn @click="goBackToList"> Cancelar </v-btn>
    </form>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required, maxLength, email, helpers } from "@vuelidate/validators";
import axios from "axios";
const { withAsync } = helpers;

export default {
  name: "StudentForm",

  props: {
    initialStudent: Object,
    beingEdited: Boolean,
  },

  setup () {
    return {
      v$: useVuelidate()
    }
  },

  data() {
    return {
      student: { ...this.initialStudent },
      edited: false
    };
  },

  validations() {
    return {
      student: {
        name: { required },
        email: { required, email },
        cpf: { required },
        ra: {
          required,
          maxLength: maxLength(15),
          uniqueRa: withAsync(async function uniqueRa(value) {
            if (value === "" || value === null) return true;
            if (this.beingEdited) return true;
            const response = await axios.get(
              "http://localhost:3333/students/ra/" + value
            );
            return response.data === "";
          }),
        },
      },
    };
  },

  computed: {
    nameErrors() {
      const errors = [];
      if (!this.v$.student.name.$dirty) return errors;
      this.v$.student.name.required.$invalid &&
        errors.push("O campo Nome é obrigatório");
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.v$.student.email.$dirty) return errors;
      this.v$.student.email.email.$invalid &&
        errors.push("O E-mail precisa ser um e-mail válido");
      this.v$.student.email.required.$invalid &&
        errors.push("O campo E-mail é obrigatório");
      return errors;
    },
    cpfErrors() {
      const errors = [];
      if (!this.v$.student.cpf.$dirty) return errors;
      this.v$.student.cpf.required.$invalid && errors.push("O campo CPF é obrigatório");
      return errors;
    },
    raErrors() {
      const errors = [];
      if (!this.v$.student.ra.$dirty) return errors;
      this.v$.student.ra.maxLength.$invalid &&
        errors.push("O campo RA só pode ter no máximo 11 caracteres");
      this.v$.student.ra.required.$invalid &&
        errors.push("O campo Registro Acadêmico é obrigatório");
      this.v$.student.ra.uniqueRa.$invalid &&
        errors.push("Registro Acadêmico já existente.");
      return errors;
    },
  },

  methods: {
    submit() {
      if (!this.edited && this.beingEdited) {
        return;
      }
      this.v$.$touch();
      const isFormCorrect = this.v$.$validate()
      isFormCorrect.then((result => {
        if (result) {
            this.$emit("form-submitted", this.student);
        }
      }));
    },
    goBackToList() {
      this.$router.push({ name: "students" });
    },
  },

  watch: {
    "student.name": function () {
      this.edited = true;
    },
    "student.email": function () {
      this.edited = true;
    },
  },
};
</script>