<template>
<div>
   <router-link type="primary" :to="{name: 'user.new'}">ADD</router-link>
  <el-table
    :data = users
    style="width: 100%">
    <el-table-column
      label="Id"
      prop="id">
    </el-table-column>
    
    <el-table-column
      label="User name"
      prop="username">
    </el-table-column>
    <el-table-column
      align="right">
      <template slot-scope="scope">
        <router-link tag="button" :to="{name: 'user.edit', params: {id: scope.row.id}}">edit</router-link>
      </template>
    </el-table-column>
  </el-table>
</div>
</template>

<script>
import { mapState } from 'vuex';
  export default {
    computed: {
      ...mapState(['users'])
    },
  }
</script>
