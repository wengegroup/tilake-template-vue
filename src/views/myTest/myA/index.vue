<!--
 * @Description:
 * @Date: 2021-06-25 09:35:52
-->
<template>
  <div class="content">
    <MyEditor v-model="code" language="dockerfile" title="dockerfile">
    </MyEditor>
  </div>
</template>

<script>
  import MyEditor from "@/components/MyEditor";
  export default {
    components: {
      MyEditor
    },
    data() {
      return {
        code: ""
      };
    },
    methods: {}
  }
</script>

<style>
.content{
  width:100%
}
</style>
