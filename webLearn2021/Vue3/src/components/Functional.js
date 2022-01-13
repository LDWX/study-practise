import { h } from 'vue'


// h: (nodeType, props Object, 下级元素....)

export default function Functional(props, context) {
  return h('div',
    context.attrs,
    h('span', {
      onClick: () => alert(props.msg),
      style: {
        fontSize: '20px'
      }
    }, props.msg)
    
  )
}
/* render(h) {
  h: createElement
} */
Functional.props = ['msg']
