<template>
    <div class="debug-container">
      <div id="carousel" class="snap">
        <div id="carousel-1">Item 1<br>Start scrolling ...</div>
        <div id="carousel-2">Item 2</div>
        <div id="carousel-3">Item 3</div>
      </div>
    </div>
</template>

<style scoped>

#carousel {
  /* Ensure that the contents flow horizontally */
  overflow-x: auto;
  white-space: nowrap;
  display: flex;
}

#carousel {
  position: relative;
  width: 100%;
  height: 100%;
}

/* 2018 spec - For Safari 11, Chrome 69+ */
#carousel.snap {
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch; /* Needed to work on iOS Safari */
}

#carousel.snap > div {
  scroll-snap-align: center;
}

#carousel > div {
  min-width: 100%;
  min-height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: #fff;
  font-size: 20px;
}

/* 2015 spec - For Firefox, Edge, IE */
#carousel.snap {
  scroll-snap-type: mandatory;
  -ms-scroll-snap-type: mandatory;
  scroll-snap-points-x: repeat(100%);
  -ms-scroll-snap-points-x: repeat(100%);
}

/* Below here is styling, not important for the actual example, just to make it look nice. No need to look down here! */

#debug-container {
  height: 100%;
  margin: 0;
  padding: 0;
  background: #226de2;
}


#carousel-1 {
  background-color: #e34747;
}

#carousel-2 {
  background-color: #5ab92c;
}

#carousel-3 {
  background-color: #226de2;
}



</style>
<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "debug",
});
</script>