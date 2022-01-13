class Page1 extends Component {
  columns = [
    { dataIndex: 'label', title: '标签' },
    {
      dataIndex: 'action',
      title: '操作',
      render: (_, record) => {
        const onOpen = () => window.open(`/xxx/${record.id}`);
        return <Button onClick = { onOpen } > 查看 < /Button>;
      }
    }
  ]
  render() {
    return <PageCommon { ...this.props } columns = { this.columns }
    />;
  }
}
// PageCommon: { query, dataSource, onChange, columns }
export default hoc(Page1, '/api/list');


