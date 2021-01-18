<template>
   <subject-detail :is-edit='false'></subject-detail>
</template>

<script>
  import SubjectDetail from './components/subjectDetail'
  export default {
    name: 'addSubject',
    components: { SubjectDetail },
  }
</script>

<style>
</style>
