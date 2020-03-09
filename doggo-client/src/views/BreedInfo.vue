<template>
  <div>
    <b-card :img-src="imageUrl" img-alt="Card image" img-top>
      <b-card-text>{{breed}}</b-card-text>
    </b-card>
  </div>
</template>

<script>
import { mapState } from "vuex";
import _ from "lodash";
export default {
  data() {
    return {
      breed: "",
      imageUrl: ""
    };
  },
  computed: {
    ...mapState(["allBreedsArrayPromise"])
  },
  mounted: function() {
    this.allBreedsArrayPromise.then(items => {
      this.breed = items[this.$route.params.index];
      const breedNameSplitted = _.split(this.breed, " ");
      const arrlen = breedNameSplitted.length;
      if (arrlen === 1) {
        fetch(`https://dog.ceo/api/breed/${breedNameSplitted[0]}/images/random`)
          .then(res => res.json())
          .then(op => (this.imageUrl = op.message));
      } else if (arrlen === 2) {
        fetch(
          `https://dog.ceo/api/breed/${breedNameSplitted[1]}/${breedNameSplitted[0]}/images/random`
        )
          .then(res => res.json())
          .then(op => (this.imageUrl = op.message));
      }
    });
  }
};
</script>

<style scoped>
.card {
  margin: 100px auto;
}
.card-img-top {
  object-fit: cover;
  height: 500px;
}
.card-text {
  font-size: 1.5rem;
  text-transform: capitalize;
}

@media only screen and (min-width: 1071px) {
  .card {
    width: 40%;
  }
}

@media only screen and (max-width: 1070px) {
  .card {
    width: 70%;
  }
}

@media only screen and (max-width: 600px) {
  .card {
    width: 95%;
  }
}
</style>