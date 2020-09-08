<template>
<div class="item">
    <img class="avatar" :src="avatar_url"/>
    <div class="des">
        <div class="name">{{name}}</div>
        <div class="github-profile"><a :href="`https://github.com/${githubId}`">github.com/{{githubId}}</a></div>
        <div>{{bio}}</div>
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
.item{
    width: 250px;
    height: 400px;
    border: solid 1px;
    margin: 10px;
}

.avatar{
    width: 100%;
    height: auto;
    max-height: 275px;
}

.github-profile {
    color: #999;
    font-size: 14px;
    transition: all .2s ease;
}

.des {
    text-align: left;
}

.name {
    font-size: 20px;
    weight: 500;
    align: left;
}
</style>
