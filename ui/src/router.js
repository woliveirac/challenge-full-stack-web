import Vue from 'vue'
import Router from 'vue-router'
import StudentList from './components/Students/StudentList.vue'
import StudentEdit from './components/Students/StudentEdit.vue'
import StudentNew from './components/Students/StudentNew.vue'

Vue.use(Router)

export default new Router ({
    mode: "history",
    base: "/",
    routes: [
        {
            path: '/',
            name: 'home',
            component: StudentList
        },
        {
            path: '/students',
            name: 'students',
            component: StudentList
        },
        {
            path: '/students/:id/edit',
            name: 'student-edit',
            component: StudentEdit
        },
        {
            path: '/students/new',
            name: 'student-new',
            component: StudentNew
        }
    ]
})