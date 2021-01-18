<template> 
  <skill-product :is-edit='false'></skill-product>
</template>
<script>
  import SkillProduct from './components/SkillProduct'
  export default {
    name: 'addSkillProduct',
    components: { SkillProduct }
  }
</script>
<style>
</style>
