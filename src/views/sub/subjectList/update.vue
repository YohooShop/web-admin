<template>
  <subject-detail :is-edit='true'></subject-detail>
</template>

<script>
  import SubjectDetail from './components/subjectDetail'
  export default {
    name: 'updateSubject',
    components: { SubjectDetail },
  }
</script>

<style>
</style>
