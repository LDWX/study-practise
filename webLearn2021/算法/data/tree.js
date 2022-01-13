// 树结构
// 前序中序后序遍历
const PreOrder = function(node) {
  if(node !== null) {
    console.log(node.val);
    PreOrder(node.left);
    PreOrder(node.right);
  }
}

const InOrder = function(node) {
  if(node !== null) {
    InOrder(node.left);
    console.log(node.val);
    InOrder(node.right);
  }
}

const PostOrder = function(node) {
  if(node !== null) {
    PostOrder(node.left);
    PostOrder(node.right);
    console.log(node.val);
  }
}

// 查找最大值、偶数层、拍平
