<template>
  <div class="home">
    <div class="container d-flex flex-column mt-5 pt-5">
      <div>
        <b-jumbotron bg-variant="info" text-variant="white" lead="Approachable, Versatile, Performant">
          <p class="display-4 font-weight-bold text-white">Estate Panel</p>
        </b-jumbotron>
      </div>
      <div>
        <b-card-group deck>
          <b-card
            class="text-center"
            :header="card"
            bg-variant="info"
            text-variant="white"
            v-for="(card,index) in ['Lighter','Faster',' Solid']"
            :key="index"
          >
            <b-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</b-card-text>
          </b-card>
        </b-card-group>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Home'
}
</script>
