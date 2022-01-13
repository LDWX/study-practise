import React, { Component } from 'react';
import request from 'axios';
import { Button, Table } from 'antd';
import SearchPanel from './SearchPanel';

export default class Page1 extends Component {
  state = {
    query: {
      name: '',
      id: '',
      time: '',
      valid: ''
    },
    dataSource: []
  }
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
  
/*  columns =  [
      {dataIndex: 'name', title: '名称'},
      {dataIndex: 'action', title: '操作',
      render: (_, record) => {
      return <>
        <Button onClick={() => this.onEdit(record.id)}>编辑</Button>
        <Button onClick={() => this.onDelete(record.id)}>删除</Button>
      </>;
      }
    }]  onEdit = () => {}
  onDelete = () => {} */

  onChange = (params) => {
    this.setState(query => ({ ...query, ...params }));
    request('/api/list', { // /api/list/admin
      method: 'GET',
      params
    }).then(res => { // 这⾥暂不考虑异常
      this.setState({ dataSource: res.data });
    });
  }

  componentDidMount() {
    this.onChange(this.state.query);
  }

  render() {
    const { query, dataSource } = this.state;
    return ( <>
        <SearchPanel value = { query } onChange = { this.onChange } />
        <Table
          columns = { this.columns }
          dataSource = { dataSource }
          pagination={{
            onChange: this.onChange
          }}
        />
      </>
    );
  }
}
