<script>
export default {
  name: 'MenuItem',
  functional: true,
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    hover: {
      type: Boolean,
      default: false
    }
  },
  render(h, context) {
    const { icon, title, hover } = context.props
    const vnodes = []
    if (icon) vnodes.push(<i class={[hover ? icon + '-hover' : icon, 'iconfont']} />)
    if (title) vnodes.push(<span slot='title' class='submenu-title' >{(title)}</span>)
    return vnodes
  }
}
</script>

<style scoped>
.sub-el-icon {
  color: currentColor;
  width: 1em;
  height: 1em;
}
</style>
