class Page2 extends Component {
  onEdit = id => {}
  onDelete = id => {}
  columns = [
    { dataIndex: 'name', title: '名称' },
    {
      dataIndex: 'action',
      title: '操作',
      render: (_, record) => {
        return < >
          <Button onClick = {
            () => this.onEdit(record.id) } > 编辑 < /Button> <
          Button onClick = {
            () => this.onDelete(record.id) } > 删除 < /Button> <
          />;
      }
    }
  ]
  render() {
    return <PageCommon { ...this.props } columns = { this.columns }
    />;
  }
}
// PageCommon: { query, dataSource, onChange, columns }
export default hoc(Page2, '/api/list/admin');
