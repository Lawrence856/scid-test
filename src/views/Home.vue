<template>
  <main class="home">
    <section>
      <div class="container">
        <div class="top-strip">
          <select class="sort-select" @change="onSort">
            <option value="sort_by_default">По умолчанию</option>
            <option value="sort_by_name">Сортировать по имени</option>
            <option value="sort_by_age">Сортировать по возрасту</option>
          </select>
        </div>
        
        <div class="users-list">
          <div v-if="loading" class="loader-container">
              <div class="loader"></div>
          </div>
          <template v-else>
            <UserCard 
              v-for="user in sortedUsers"
              :key="user.id"
              :first-name="user.firstName"
              :last-name="user.lastName" 
              :age="user.age" 
              :avatar="user.avatar" 
              :email="user.email" 
              :id="user.id"
            />
          </template>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import UserCard from '../components/User/UserCard.vue'

export default {
  name: 'HomeView',
  components: {
    UserCard
  },
  data() {
    return {
      loading: false,
      sort: 'sort_by_default',
      sortSettigs: {
        'sort_by_default': 'users',
        'sort_by_name': 'sortedUsersByName',
        'sort_by_age': 'sortedUsersByAge',
      }
    }
  },
  methods: {
    ...mapActions('users',[
      'fetchUsers'
    ]),

    onSort(evt) {
      // Имитация загрузки пользователей при сортировке
      this.loading = true
      setTimeout(() => {
        this.sort = evt.target.value
        this.loading = false
      }, 1000)
    }
  },
  computed: {
    ...mapGetters('users', {
      users: 'getUsers',
      sortedUsersByName: 'getSortedUsersByName',
      sortedUsersByAge: 'getSortedUsersByAge'
    }),

    sortedUsers() {
      return this[this.sortSettigs[this.sort]]
    }
  },
  mounted() {
    this.loading = true

    this.fetchUsers().then(() => {
      this.loading = false
    }).catch(err => {
      this.loading = false
      console.log(err)
    })
  }
}
</script>

<style lang="scss">
  .top-strip {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 20px
  }
  .users-list {
    position: relative;
    display: grid;
    gap: 15px;
    grid-template-columns: repeat(auto-fit, minmax(460px, 1fr));

    @media (max-width: 767px) {
      grid-template-columns: repeat(auto-fit, minmax(290px, 1fr));
    }

    & > .loader-container {
      position: static;
      min-height: 85vh;
    }
  }
</style>
