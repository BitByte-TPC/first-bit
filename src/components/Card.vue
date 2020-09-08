<template>
<div class="item">
    <img class="avatar" :src="avatar_url"/>
    <div class="des">
        <div class="name">{{name}}</div>
        <div class="github-profile"><a :href="`https://github.com/${githubId}`">github.com/{{githubId}}</a></div>
        <div class="bio">{{bio}}</div>
    </div>
</div>
</template>

<script>
export default {
  name: 'Card',
  props: {
    avatar_url: String,
    name: String,
    githubId: String,
    bio: String,
  },

  methods: {
    fetchImage() {
    },
  },
};
</script>

<style>
.item {
  width: 250px;
  min-height: 360px;
  border-radius: 5px;
  margin: 15px 10px;
  border: solid #0f142b 1px;
  box-shadow: 0 0 2px #0f142b;
  transition: all 150ms ease-out;
  display: flex;
  flex-flow: column;
}

.item:hover {
  box-shadow: 0 0 4px #0f142b;
  transform: perspective(1000px) rotateY(-10deg) translate3d(-3px, 0, 0);
  border: solid #ffffff 1px;
}

.avatar {
  width: 100%;
  height: auto;
  border-radius: 5px 5px 0 0;
  max-height: 275px;
  flex: 0 1 auto;
}

.github-profile {
  color: #ed5371;
  font-size: 12px;
  text-decoration: none;
}

.des {
  text-align: left;
  padding: 5px;
  background: #080e28;
  height: fit-content;
  flex: 1 1 auto;
  border-radius: 0 0 5px 5px;
}

.name {
  color: #47cdd6;
  font-size: 24px;
  font-weight: 500;
  margin: 3px 0;
}

.bio {
    font-size: 14px;
    margin: 3px 0;
}
</style>
