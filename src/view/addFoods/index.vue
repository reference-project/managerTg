<template>
  <div>
    <select v-model="selected" name="fruit">
      <option value>选择一个网站</option>
      <option value="www.runoob.com">Runoob</option>
      <option value="www.google.com">Google</option>
    </select>
  </div>
</template>

<script>
export default {
  data() {
    return {
    
selected: 'www.runoob.com'

    };
  },
  
};
</script>

<style scoped lang="scss">
</style>
