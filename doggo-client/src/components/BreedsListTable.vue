<template>
  <div>
    <h1>All Dog Breeds List</h1>
    <b-list-group>
      <router-link
        class="list-group-item"
        :to="`/breedinfo/${index}`"
        :key="index"
        :index="dog"
        v-for="(dog,index) in allBreeds"
      >{{dog}}</router-link>
    </b-list-group>
    <br />
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      allBreeds: []
    };
  },
  computed: {
    ...mapState(["allBreedsArrayPromise"])
  },
  mounted: function() {
    this.allBreedsArrayPromise.then(item => this.allBreeds.push(...item));
  }
};
</script>

<style scoped>
h1 {
  margin: 50px;
}
.list-group-item:hover {
  cursor: pointer;
  background: #e9ecef;
  text-decoration: none;
  font-size: 1.2rem;
  color: #48b983;
}
.list-group-item {
  color: #2c3e50;
  font-size: 1.1rem;
  text-transform: capitalize;
}
@media only screen and (min-width: 1071px) {
  .list-group {
    width: 40%;
    margin: 50px auto;
  }
}

@media only screen and (max-width: 1070px) {
  .list-group {
    width: 60%;
    margin: 30px auto;
  }
}
@media only screen and (max-width: 600px) {
  .list-group {
    width: 95%;
    margin: 30px auto;
  }
}
</style>