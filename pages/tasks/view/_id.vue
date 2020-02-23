<template>
  <div>
    <div class="task-view-main">
      <div class="task-content">
        <header class="task-header">
          <p class="task-date">Due on March, 29th</p>
          <h1>Bussiness trip to newyork</h1>
          <p class="task-status">
            In progress<i class="icofont-children-care" />
          </p>
        </header>
        <div class="task-labels">
          <span class="task-label">trip</span>
        </div>
        <div class="task-details-main">
          <p class="task-description">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquam
            enim harum ipsum autem tempora neque debitis sint veritatis iure
            iste?
          </p>
          <div class="task-actions">
            <label for="task-status" class="task-date">Status</label>
            <v-select
              id="task-status"
              :searchable="false"
              placeholder="Progress"
              :options="['Progress', 'Completed']"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="task-footer">
      <footer>
        <div class="footer-actions-content">
          <p class="task-created">Created on March, 29th</p>
          <span class="delete-icon"><i class="icofont-bin"></i></span>
        </div>
      </footer>
    </div>
  </div>
</template>
<script>
export default {
  transition: 'slide-down'
}
</script>
<style lang="scss" scoped>
.task-details-main {
  box-sizing: border-box;
  padding: 10px 0;
  margin-top: 20px;
}
.task-view-main {
  border: 1px solid #1b1b1b;
  border-radius: 8px 8px 0 0;
  padding: 10px;
  background: #1b1b1b;
}
.task-description {
  font-size: 18px;
}
.task-actions {
  margin-top: 20px;
}
#task-status {
  margin-top: 5px;
}
.footer-actions-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  padding: 15px 10px;
  background: #181717;
  border-radius: 0 0 8px 8px;

  .task-created {
    font-size: 14px;
    color: #949494;
  }
  .delete-icon {
    color: #f64b3c;
  }
}
</style>
