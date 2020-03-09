<template>
  <div class="home-view-container">
    <img
      class="cover-image"
      src="https://images.pexels.com/photos/1851164/pexels-photo-1851164.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
      alt
      srcset
    />

    <section class="white-section" id="features">
      <div class="container-fluid">
        <div class="row">
          <div class="feature-col col-lg-4">
            <i class="fas fa-check-circle"></i>
            <img class="feature-img" src="../assets/bullseye-solid.svg" alt srcset />
            <h3 class="feature-title">Easy to use.</h3>
            <p>So easy to use, even your dog could do it.</p>
          </div>

          <div class="feature-col col-lg-4">
            <img class="feature-img" src="../assets/check-circle-solid.svg" alt srcset />
            <h3 class="feature-title">Elite Clientele</h3>
            <p>We have all the dogs, the greatest dogs.</p>
          </div>

          <div class="feature-col col-lg-4">
            <img class="feature-img" src="../assets/heart-solid.svg" alt srcset />
            <h3 class="feature-title">Guaranteed to work.</h3>
            <p>Find the dog of your life or your money back.</p>
          </div>
        </div>
      </div>
    </section>
    
    <Footer /> 
  </div>
</template>

<script>
import Footer from "@/components/Footer.vue"

export default {
  components: {Footer},
  name: "Home",
  data() {
    return {};
  },
  computed: {},
  methods: {}
};
</script>

<style scoped>
.cover-image {
  object-fit: cover;
  width: 100%;
  height: 450px;
}
.white-section {
  margin: 50px auto;
}
.feature-img {
  height: 100px;
  width: 100px;
}
.home-view-container {
  min-height: 100%;
  margin-bottom: -50px;
}
.push,
footer {
  height: 50px;
}
.footer-section {
  background-color: #25a2b8;
  height: 100px;
}
.feature-col {
  margin: 20px auto;
}

#footer-text {
  position: relative;
  bottom: 10px;
}
</style>