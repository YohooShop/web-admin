<template> 
  <reply-edit :is-edit='false'></reply-edit>

</template>
<script>
  import ReplyEdit from './components/edit'
  export default {
    name: 'addReply',
    components: { ReplyEdit }
  }
</script>
<style>
</style>