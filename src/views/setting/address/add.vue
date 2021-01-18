<template>
   <address-detail :is-edit='false'></address-detail>
</template>

<script>
  import AddressDetail from './components/AddressDetail'
  export default {
    name: 'addAddress',
    components: { AddressDetail }
  }
</script>

<style>
</style>
