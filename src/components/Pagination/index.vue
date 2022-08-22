<template>
  <div class="pagination">
    <!-- 上层结构 -->
    <button :disabled="pageNo == 1" @click="$emit('getPageNo', pageNo - 1)">
      上一页
    </button>
    <button
      v-if="startNumAndEndNum.start > 1"
      @click="$emit('getPageNo', 1)"
      :class="{ active: pageNo == 1 }"
    >
      1
    </button>
    <button v-if="startNumAndEndNum.start > 2">···</button>

    <!-- 中间结构 -->
    <button
      v-for="(page, index) in startNumAndEndNum.end"
      :key="index"
      v-if="page >= startNumAndEndNum.start"
      @click="$emit('getPageNo', page)"
      :class="{ active: pageNo == page }"
    >
      {{ page }}
    </button>
    <!-- 下层结构 -->
    <button v-if="startNumAndEndNum.end < totalPage - 1">···</button>
    <button
      v-if="startNumAndEndNum.end < totalPage"
      @click="$emit('getPageNo', totalPage)"
      :class="{ active: pageNo == totalPage }"
    >
      {{ totalPage }}
    </button>
    <button
      :disabled="pageNo == totalPage"
      @click="$emit('getPageNo', pageNo + 1)"
    >
      下一页
    </button>

    <button style="margin-left: 30px">共{{ total }}条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: ["pageNo", "pageSize", "total", "continues"],
  computed: {
    //总共多少页
    totalPage() {
      //向上取整
      return Math.ceil(this.total / this.pageSize);
    },
    //计算连续页码的起始数字和结束数字
    startNumAndEndNum() {
      //解构数据:解构出来数据就不用前面写this了
      const { continues, pageNo, totalPage } = this;
      //定义两个变量分别存储起始和结束数字
      let start = 0,
        end = 0;
      // 连续页码数字至少5页，若出现不足五页情况
      if (continues > totalPage) {
        start = 1;
        end = totalPage;
      } else {
        //正常现象：连续页码数字至少5页，总页数大于5页
        start = pageNo - parseInt(continues / 2);
        end = pageNo + parseInt(continues / 2);
        //把出现不正常的现象漏洞 修复start小于最小页码
        if (start < 1) {
          start = 1;
          end = continues;
        }
        //修复end大于最大页码
        if (end > totalPage) {
          end = totalPage;
          start = totalPage - continues + 1;
        }
      }
      return { start, end };
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}

//分页器所需数据
// pageNo 分页器当前页数
// pageSize 分页器每一页展示多少数据
// total 全部数据个数-----可以获取信息：一共多少页
//continues 分页器连续页码 5|7页,奇数对称
</style>

