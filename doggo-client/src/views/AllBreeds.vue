<template>
  <BreedsListTable :allBreeds="allBreeds" />
</template>

<script>
import { mapState } from "vuex";
import BreedsListTable from "@/components/BreedsListTable.vue";

export default {
  components: {
    BreedsListTable
  },
  data() {
    return {};
  },
  computed: {
    ...mapState(["allBreeds"])
  }
};
</script>
