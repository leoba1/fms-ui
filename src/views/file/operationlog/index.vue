<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="ID" prop="operationLogId">
        <el-input
          v-model="queryParams.operationLogId"
          placeholder="请输入LogID"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="用户ID" prop="userId">
        <el-input
          v-model="queryParams.userId"
          placeholder="请输入用户ID"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['file:operationlog:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="operationlogList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="logID" align="center" prop="operationLogId" />
      <el-table-column label="操作详情" align="center" prop="detail" />
      <!-- <el-table-column label="${comment}" align="center" prop="logLevel" /> -->
      <el-table-column label="操作" align="center" prop="operation" />
      <!-- <el-table-column label="${comment}" align="center" prop="operationObj" /> -->
      <el-table-column label="请求方式" align="center" prop="requestMethod" />
      <el-table-column label="请求路径" align="center" prop="requestURI" />
      <el-table-column label="操作结果" align="center" prop="result" />
      <el-table-column label="来源" align="center" prop="source" />
      <el-table-column label="终端ip地址" align="center" prop="terminal" />
      <el-table-column label="操作时间" align="center" prop="time" />
      <el-table-column label="用户ID" align="center" prop="userId" />
      <!-- <el-table-column label="操作" align="center" class-name="small-padding fixed-width"> -->
        <!-- <template slot-scope="scope">
      
        </template>
      </el-table-column> -->
    </el-table>
    
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改log对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listOperationlog, getOperationlog, delOperationlog, addOperationlog, updateOperationlog } from "@/api/file/operationlog";

export default {
  name: "Operationlog",
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // log表格数据
      operationlogList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        operationLogId: null,
        userId: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询log列表 */
    getList() {
      this.loading = true;
      listOperationlog(this.queryParams).then(response => {
        this.operationlogList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        operationLogId: null,
        detail: null,
        logLevel: null,
        operation: null,
        operationObj: null,
        platform: null,
        requestMethod: null,
        requestURI: null,
        result: null,
        source: null,
        terminal: null,
        time: null,
        userId: null
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.operationLogId)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加log";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const operationLogId = row.operationLogId || this.ids
      getOperationlog(operationLogId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改log";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.operationLogId != null) {
            updateOperationlog(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addOperationlog(this.form).then(response => {
              this.$modal.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const operationLogIds = row.operationLogId || this.ids;
      this.$modal.confirm('是否确认删除log编号为"' + operationLogIds + '"的数据项？').then(function() {
        return delOperationlog(operationLogIds);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('file/operationlog/export', {
        ...this.queryParams
      }, `operationlog_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
