<script>
import refs from './refs';
let count = 0;

export default {
  name: 'item',
  data() {
    let cid = this.cid || (`item` + ++count);
    return {
      level: (this.$parent.level || 0) + 1, // 当前节点的层级
      indent: 1, // 缩进单位
      expand: false,
      checked: false,
      cid
    }
  },
  props: {
    name: String,
    option: Object,
    value: Array
  },
  computed: {
    // ===是否有子节点
    isFolder() {
      return !!this.option['children'];
    }
  },
  mounted() {
    // 初始化
    let name = this.name;

    // 创建节点
    refs.set(name, this);

    // 恢复初始状态
    this.setDefault();
  },
  methods: {
    handleClickExpand() {
      this.expand = !this.expand;
    },
    handleClickItem() {
      this.checked = !this.checked;
    },
    setDefault() {
      // 方法一：直接获取tree节点
      let tree = refs.get(this.name);
      // 方法二：传入value，获取当前节点
      // let node = refs.get(this.name, this.cid);
      let _value = tree.value;

      // node操作

      // 恢复勾选
      if (_value.indexOf(this.option['value']) > -1) {
        this.checked = true;
      }
    }
  },
  render(h) {
    return (
      <li class={['tree_item', this.checked && 'is-checked']}>
        {/* 展开箭头 */}
        <div class={['arrow', this.expand ? 'expand' : '']}
          style={{display: this.isFolder ? 'block' : 'none'}}
          onClick={this.handleClickExpand}></div>

        {/* 展示标题 */}
        <a class={['v-tree__title']}
          style={{paddingLeft: this.level !== 0 && (`${this.level * this.indent}px`)}}
          onClick={this.handleClickItem}>
          { this.option['text'] }
        </a>

        {/* 子节点嵌套 */}
        {
          this.isFolder &&
            <ul style={{display: this.expand ? 'block' : 'none'}}>
              {
                this.option['children'].map((itemData, index) => {
                  return (
                    <item name={this.name}
                      option={itemData}
                      value={this.value}
                      key={`${this.name}${itemData['value']}${index}`}>
                    </item>
                  )
                })
              }
            </ul>
        }
      </li>
    )
  }
}
</script>
<style scoped>
  .tree_item {
    cursor: pointer;
  }
  li {
    position: relative;
  }
  .v-tree__title {
    margin: 5px;
  }
  .arrow {
    position: absolute;
    left: -10px;
    top: 10px;
    width: 5px;
    height: 5px;
    border-top: 1px solid gray;
    border-left: 1px solid gray;
    transform: rotate(-135deg);
  }
  .expand {
    transform: rotate(45deg);
  }
  .is-checked {
    color: blue;
  }
  ul, li {
    list-style: none;
  }
</style>