<template>
    <div class="container">
        <Card v-for="(item, index) in nameDB"
          :key="index"
          :name="item.name"
          :bio="item.bio"
          :githubId="item.githubId"
          :avatar_url="item.avatar_url" />
    </div>
</template>

<script>
import nameDB from '../../public/nameDB.json';
import Card from './Card.vue';

export default {
  name: 'Grid',
  components: {
    Card,
  },
  props: {},
  data() {
    return {
      nameDB,
    };
  },

  mounted() {
    this.nameDB = this.nameDB
      .filter((prof) => prof.name && prof.bio && prof.githubId)
      .sort((a, b) => {
        const fa = a.name.toLowerCase();
        const fb = b.name.toLowerCase();

        if (fa < fb) {
          return -1;
        }
        if (fa > fb) {
          return 1;
        }
        return 0;
      });
  },
};
</script>

<style>

.container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: start;
  align-content: flex-start;
}

</style>
