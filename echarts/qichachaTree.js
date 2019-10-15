var myChart;
var showKeyNo;
var Text = require('zrender/shape/Text');
var ImageShape = require('zrender/shape/Image');
var Rectangle = require('zrender/shape/Rectangle');
var treeId = 1;
var _currentKeyNo;
var canEditRect = false;

$(document).ready(function () {
  resizeScreen();
  myChart = echarts.init(document.getElementById('main'));

  //new window.zoomutil({dom: $('#mainGuquan')[0], chart:myChart}); // add zoomutil feature
  getData();



});

window.onresize = function () {
  resizeScreen();
}
var rootData;
var gudongData;
var touziData;

function getData() {
  $('#load_data').show();
  var url = INDEX_URL + "cms_guquanmap3";
  $.ajax({
    url: url,
    type: 'GET',
    data: {
      keyNo: getQueryString("keyNo"),
    },
    dataType: 'JSON',
    success: function (data) {
      $('#load_data').hide();
      if (data && data.status === 200) {
        $('#no_data').hide();
        rootData = data;
        gudongData = data.gudong;
        touziData = data.touzi;
        transTree(gudongData, 1);
        initTree(gudongData);
        transTree(touziData, 2);
        initTree(touziData);
        drawGuquan();
        if (window.iframe) {
          setTimeout(function () {
            if (touziData || gudongData.children.length > 4) {
              maoScale(2);
            }
            $('.guquan-liframe').hide();
            $(window.parent.document).find('#guquanIframeTool').show();
          }, 500);
        }
      } else {
        $('#no_data').show();
        $('#screenArea').hide();
        if (window.iframe) {
          $('.guquan-liframe').hide();
          $('.guquan-lnodata').show();
        }
      }
    }
  });
}


function changeScreen(dom) {
  if (!isFullScreen()) {
    $(dom).html('<span class="screened"></span>退出');
    launchFullScreen($('#screenArea')[0]);
  } else {
    $(dom).html('<span class="screen"></span>全屏');
    exitFullScreen();
  }
}

//切换全屏
setFullScreenListener(function () {
  setTimeout(function () {
    myChart.resize();
    initZrender();
  }, 300);
}) //


function maoRefresh() {

  refresh();
}

function refresh() {

  var ecConfig = require('echarts/config');
  myChart._messageCenter.dispatch(ecConfig.EVENT.RESTORE, null, null, myChart);
}

function saveImg() {
  if (isFullScreen()) {
    $('#changeScreen').html('<span class="screen"></span>全屏');
    exitFullScreen();
    setTimeout(function () {
      jietu();
    }, 1000);

  } else {
    jietu();
  }

  function jietu() {
    var jietuMask = document.createElement("div");
    $(jietuMask).attr('style', 'position: fixed; background: #fff; z-index: 1000; top: 0px; bottom: 0px; left: 0px; right: 0px;');
    document.body.appendChild(jietuMask);

    var width = 1440;
    var height = 900;

    var minX = 0;
    var maxX = 0;
    var minY = 300;
    var maxY = 0;
    var moveDown = 0;
    var moveRight = 0;

    var shapeList = myChart.getZrender().storage.getShapeList();
    for (var i = 0; i < shapeList.length; i++) {
      if (shapeList[i].style && shapeList[i].style.iconType == 'rectangle') {
        if (shapeList[i].style.x > maxX) {
          maxX = shapeList[i].style.x;
        }
        if (shapeList[i].style.x < minX) {
          minX = shapeList[i].style.x;
        }
        if (shapeList[i].style.y > maxY) {
          maxY = shapeList[i].style.y;
        }
        if (shapeList[i].style.y < minY) {
          minY = shapeList[i].style.y;
        }
      }
    }

    if ((maxX - minX + 300) > width) {
      width = maxX - minX + 300;
      moveRight = -(maxX + minX - myChart.getZrender().getWidth() + 146) / 2;

    }
    if ((maxY - minY + 300) > 900) {
      height = maxY - minY + 300;
    }

    moveDown = -(maxY + minY - myChart.getZrender().getHeight()) / 2 - 85;

    var layer = myChart.getZrender().painter._layers[1];
    var bS = layer.scale.concat();
    var bP = layer.position.concat();

    layer.scale = [1, 1, 0, 0];
    layer.position = [0, 0];

    var bW = myChart.getZrender().getWidth();
    var bH = myChart.getZrender().getHeight();

    $('#main').width(width);
    $('#main').height(height);

    var zdW = myChart.getZrender().getWidth();
    var zdH = myChart.getZrender().getHeight();





    myChart.resize();

    myChart.getZrender().painter.refresh();

    initZrender(true);

    layer.position[0] = moveRight;
    layer.position[1] = moveDown;

    var shape1 = new Rectangle({
      style: {
        x: -1000 - moveRight,
        y: -1000 - moveDown,
        width: width + 1000,
        height: height + 1000,
        color: '#fff'
      }
    });
    shape1.zlevel = 1;
    shape1.z = -2;
    shape1.ndelete = true;
    myChart.getZrender().addShape(shape1);


    for (var i = 0; i < width + 100; i += 300) {
      for (var j = 0; j < height + 100; j += 228) {
        var shapeSy = new ImageShape({
          style: {
            image: '/material/theme/chacha/cms/v2/images/shuiying2.png',
            x: i - moveRight,
            y: j - moveDown,
            width: 300,
            height: 228

          }
        });
        shapeSy.zlevel = 1;
        shapeSy.z = -1;
        shapeSy.ndelete = true;
        myChart.getZrender().addShape(shapeSy);
      }
    }

    var shape3 = new Text({
      style: {
        x: width / 2 - 165 - moveRight,
        y: height - 30 - moveDown,
        text: '股权穿透图由企查查基于公开信息利用大数据分析引擎独家生成。',
        strokeColor: '#999',
        color: '#999',
        textFont: 'normal 12px 微软雅黑',
        lineWidth: 0,
      }
    });
    shape3.zlevel = 1;
    shape3.z = -1;
    shape3.ndelete = true;
    myChart.getZrender().addShape(shape3);

    setTimeout(function () {
      var canvas = $('#main canvas')[1];

      var isIE11 = (!!window.ActiveXObject || "ActiveXObject" in window);
      if (isIE11) {
        downloadimg(canvas);
      } else {
        download(canvas, 'jpg');
      }

      $('#main').width('100%');
      $('#main').height(bH);
      myChart.resize();
      layer.scale = bS;
      layer.position = bP;
      myChart.getZrender().render();
      initZrender();
      $(jietuMask).css('display', 'none');
    }, 300);
  }
}

function maoScale(type) {
  var centerX = myChart.getZrender().getWidth() / 2;
  var centerY = myChart.getZrender().getHeight() / 2;
  var layer = myChart.getZrender().painter._layers[1];
  var x = layer.scale[0] * centerX + layer.position[0];
  var y = layer.scale[1] * centerY + layer.position[1];
  var scale = layer.scale[0];
  if (type == 1) {
    scale += 0.3;
  } else if (type == 2) {
    scale -= 0.3;
  }
  if (scale >= 0.3 && scale <= 2) {
    layer.scale[0] = scale;
    layer.scale[1] = scale;
    myChart.getZrender().render();
    layer.position[0] = x - layer.scale[0] * centerX
    layer.position[1] = y - layer.scale[1] * centerY
    myChart.getZrender().render();
  }
}

function editRect(dom) {
  if (canEditRect) {
    $(dom).removeClass('active');
    canEditRect = false;
  } else {
    $(dom).addClass('active');
    canEditRect = true;
  }
  initZrender();
}



function transTree(data, type) {
  if (!data) return;
  data.children = data.DetailList;
  data.DetailList = undefined;
  data.treeId = treeId;
  if (type == 2) {
    data.isTouzi = true;
  }
  var fontSize = 12;
  if (data.ShortStatus == '注销' || data.ShortStatus == '吊销') {
    data.Name = '【' + data.ShortStatus + '】' + data.Name;
  }
  if (data.Name.length > 20) {
    data.name = data.Name.substr(0, 19) + '…';
    data.ltext = true;
  } else {
    data.name = data.Name;
  }
  if (data.Org == 2 && data.Name.length > 8) {
    data.name = data.Name.substr(0, 7) + '…';
  }
  data.name = data.name.replace(/(.{10})(?=.)/g, '$1\n');

  if (data.StockRightNum) {
    data.subtext = '持股数：' + data.StockRightNum + '';
  } else if (data.ShouldCapi) {
    var capiArr = data.ShouldCapi.split(',');
    if (capiArr.length > 1) {
      capiNum = 0;
      $.each(capiArr, function (index, num) {
        capiNum += parseFloat(num);
      })
    } else {
      capiNum = parseFloat(data.ShouldCapi);
    }
    if ((capiNum + '').length > 10) {
      capiNum = capiNum.toFixed(2);
    }
    data.subtext = '认缴金额：' + capiNum + '万';
  }
  if (data.KeyNo) {
    if (data.Tags) {
      for (var i = 0; i < data.Tags.length; i++) {
        if (data.Tags[i].Type == 402) {
          data.tag = data.Tags[i].Name;
        }
      }
    }
  }

  if (data.Tags) {
    $.each(data.Tags, function (index, vo) {
      if (vo.Type == 2) {
        data.tag = '上市公司';
        data.list = true;
      } else if (vo.Type == 1) {
        data.tag = '新三板公司';
        data.list = true;
      } else if (vo.Type == 401) {
        data.tag = '港股上市';
        data.list = true;
      }
    });
  }

  data.editable = true;
  data.symbol = 'rectangle';
  data.symbolSize = [146, 62];
  if (data.tag) {
    data.symbolSize = [146, 82];
  }
  data.labelClick = true;
  data.itemStyle = {
    normal: {
      color: "#fff",
      borderWidth: "1",
      borderColor: "#ccc",
      label: {
        show: true,
        position: "inside",
        textStyle: {
          fontFamily: "MicroSoft YaHei",
          fontSize: fontSize,
          color: '#333',
          fontStyle: "normal",
        },
      }
    },
    emphasis: {
      color: "rgba(255,255,255,0)",
      borderWidth: "1",
      borderColor: "rgba(255,255,255,0)",
    }
  };

  if (data.Org == 2) {
    data.symbol = 'rectangle';
    data.clickable = true;
    data.labelClick = false;
    data.symbolSize = [146, 55];
    data.itemStyle = {
      normal: {
        color: "#F3F9FE",
        borderWidth: "1",
        borderColor: "#128bed",
        label: {
          show: !0,
          position: "inside",
          textStyle: {
            color: '#333',
            fontFamily: "MicroSoft YaHei",
            fontSize: 14,
            fontStyle: "normal",
          },
        }
      },
      emphasis: {
        color: "rgba(255,255,255,0)",
        borderWidth: "1",
        borderColor: "rgba(255,255,255,0)",
      }
    };
  }

  var children = data.children;
  if (children) {
    for (var i = 0; i < children.length; i++) {
      transTree(children[i], type);
      children[i] = addTampArrow(children[i], fontSize);
    }
  }

  if (type == 1) {
    if (rootData.kzr) {
      if (data.KeyNo) {
        if (data.KeyNo == rootData.kzr.ControllerData.KeyNo) {
          data.kzr = true;
        }
      } else {
        if (data.Name == rootData.kzr.ControllerData.Name) {
          data.kzr = true;
        }
      }
    }
    if (rootData.syr) {
      $.each(rootData.syr.Names, function (index, vo) {
        if (data.KeyNo) {
          if (data.KeyNo == vo.KeyNo) {
            data.syr = vo.PercentTotal;
          }
        } else {
          if (data.Name == vo.Name) {
            data.syr = vo.PercentTotal;
          }
        }
      })
    }
  } else if (type == 2) {
    if (rootData.kg) {
      $.each(rootData.kg.Names, function (index, vo) {
        if (type == 2 && data.KeyNo && data.KeyNo == vo.KeyNo) {
          data.kg = true;
        }
      })
    }
  }
  treeId++;

}

function addTampArrow(cnode, fontSize) {
  var tamp = cnode;
  var Ratio = (!cnode.Percent || cnode.Percent == '0%') ? '' : cnode.Percent;
  if (Ratio) {
    Ratio = (parseFloat(cnode.Percent.substr(0, cnode.Percent.length - 1)).toFixed(4)) * 10000 / 10000 + '%';
    tamp.ratio = Ratio;
  }
  var labelShow = (Ratio != '0%');
  cnode = {
    name: Ratio,
    symbol: "arrowdown",
    symbolSize: [12, 12],
    tooltip: {
      show: !1
    },
    clickable: !1,
    hoverable: false,
    itemStyle: {
      normal: {
        color: "#128bed",
        borderWidth: 0,
        label: {
          show: labelShow,
          position: "right",
          textStyle: {
            fontFamily: "MicroSoft YaHei",
            fontSize: fontSize,
            fontStyle: "normal",
          },
        }
      },
      emphasis: {
        color: "#128bed",
        borderWidth: 0,
        label: {
          show: labelShow,
          position: "right",
          textStyle: {
            fontFamily: "MicroSoft YaHei",
            fontSize: fontSize,
            fontStyle: "normal",
          },
        }
      }
    },
    lineStyle: {
      width: 1,
      color: "#333"
    },
    children: [tamp]
  }
  return cnode;
}

function initTree(data) {
  if (!data) return;
  data.name = data.Name;
  data.editable = false;
  data.labelClick = false;
  data.clickable = false;
  data.symbolSize = [data.name.length * 16 + 80, 52];
  data.symbol = 'rectangle';
  data.itemStyle = {
    normal: {
      color: "#fff",
      borderWidth: "1",
      borderColor: "#128bed",
      label: {
        show: !0,
        position: "inside",
        textStyle: {
          color: '#000',
          fontFamily: "MicroSoft YaHei",
          fontSize: 16,
          fontStyle: "normal",
        },
      }
    },
    emphasis: {
      color: "rgba(255,255,255,0)",
      borderWidth: "1",
      borderColor: "#128bed00",
    }
  };
  getNode(gudongData);
  getNode(touziData);

  function getNode(data) {
    if (!data) return;
    if (data.children) {
      for (var i = 0; i < data.children.length; i++) {
        getNode(data.children[i]);
      }
    }
    if (data.children && data.children.length > 0 && data.KeyNo && data.KeyNo != getQueryString("keyNo")) {
      data._children = data.children;
      data.children = null;
      data.extend = 1;
      //data.symbol = 'rectangle';
    }

  }

}

//股权穿透图
function drawGuquan() {
  myChart.clear();
  option = {
    title: {
      text: '',
    },
    series: [

    ]
  };
  var roam = true;
  if (window.iframe) {
    roam = 'move';
  }
  if (gudongData) {
    option.series.push({
      type: "tree",
      orient: "vertical",
      nodePadding: 25,
      layerPadding: 40,
      symbol: "circle",
      roam: roam,
      rootLocation: {
        "x": "50%",
        "y": "50%"
      },
      direction: "inverse",
      data: [gudongData]
    });
  }
  if (touziData) {
    option.series.push({
      type: "tree",
      orient: "vertical",
      nodePadding: 25,
      layerPadding: 40,
      symbol: "circle",
      roam: roam,
      rootLocation: {
        "x": "50%",
        "y": "50%"
      },
      //direction:"inverse",
      data: [touziData]
    })
  }
  if (gudongData && !touziData) {
    option.series[0].rootLocation.y = '65%';
  }
  myChart.setOption(option);
  initZrender();
  animatieChart(myChart);

  var isDrag;
  var dragStartPos;
  myChart.getZrender().on("mousedown", function (param) {
    isDrag = true;
    dragStartPos = [param.event.x, param.event.y];

  });
  myChart.getZrender().on("mouseup", function (param) {
    if (dragStartPos[0] == param.event.x && dragStartPos[1] == param.event.y) {
      isDrag = false;
    }
    dragStartPos = [];
  });

  myChart.on('click', function (e) {
    if (isDrag) return;
    if ((e.data.Org == 0 || e.data.Org == 4 || e.data.Org == 7 || e.data.Org == 8 || e.data.Org == 9) && e.data.KeyNo && e.data.KeyNo != showKeyNo) {
      if (e.data.KeyNo[0] == 'p') {
        if (window.iframe) {
          window.open('/pl_' + e.data.KeyNo + '.html');
        } else {
          showKeyNo = e.data.KeyNo;
          showDetail2(showKeyNo, 'company_muhou4', 'person');
        }
      } else {
        if (window.iframe) {
          window.open('/firm_' + e.data.KeyNo + '.html');
        } else {
          showKeyNo = e.data.KeyNo;
          showDetail(showKeyNo, 'company_guquan');
        }
      }
    }
    if (e.data.Org == 2) {
      if (e.data.KeyNo && e.data.KeyNo.length == 32) {
        if (window.iframe) {
          window.open('/pl_' + e.data.KeyNo + '.html');
        } else {
          showKeyNo = e.data.KeyNo;
          showDetail2(showKeyNo, 'company_muhou4', 'person');
        }
      } else {
        window.open('/people?name=' + encodeURI(e.data.Name) + '&keyno=' + e.data.ParentKeyNo);
      }
    }
  });


  myChart.getZrender().on('click', function (e) {
    if (isDrag) return;
    if (e.target && e.target.clickcom) {
      troggleTree(e.target.keyNo, e.target.treeId);
    }
    if (e.target && e.target.editcom) {
      editTree(e.target.keyNo, e.target.treeId);
    }
  });

  var hoverName = ''
  // myChart.on('hover', function(e){
  //     if(e.data.Name&&e.data.Name.length>10&&e.data.Name!=hoverName){
  //         hoverName = e.data.Name;
  //         $('#hoverName').text(e.data.Name);
  //         $('#hoverName').css('left',e.event.screenX-10);
  //         $('#hoverName').css('top',e.event.screenY-50);
  //         $('#hoverName').fadeIn();
  //     }
  // }); 
  // myChart.on('mouseout', function(e){
  //     hoverName = '';
  //     $('#hoverName').fadeOut();
  // }); 

  myChart.on('restore', function (param) {
    getNode(gudongData);
    getNode(touziData);

    function getNode(data) {
      if (!data) return;
      if (data.children) {
        for (var i = 0; i < data.children.length; i++) {
          getNode(data.children[i]);
        }
      }
      if (data.children && data.children.length > 0 && data.KeyNo && data.KeyNo != getQueryString("keyNo")) {
        data._children = data.children;
        data.children = null;
        data.extend = 1;
        //data.symbol = 'circleCross';
      }

    }
    myChart.clear();
    myChart.setOption(option);
    initZrender();
    animatieChart(myChart);

  });

}

function initZrender(jietu) {
  var shapeList = myChart.getZrender().storage.getShapeList();
  for (var i = 0; i < shapeList.length; i++) {
    if (shapeList[i].clickcom || shapeList[i].ndelete) {
      myChart.getZrender().delShape(shapeList[i].id);
    }
    if (shapeList[i]._echartsData && shapeList[i]._echartsData._data && shapeList[i].style.text) {
      shapeList[i].style.text = shapeList[i].style.text.replace(/^\s+|\s+$/g, '');
    }
  }
  for (var i = 0; i < shapeList.length; i++) {
    // if(shapeList[i]._echartsData&&shapeList[i]._echartsData._data.labelClick){
    //     var shape = new Text({
    //       style: {
    //           x: shapeList[i].rotation[1]+25,
    //           y: shapeList[i].rotation[2],
    //           text: shapeList[i]._echartsData._name,
    //           color : '#333' ,
    //           textFont:'normal 13px 微软雅黑',
    //           lineWidth :0,
    //       },
    //       highlightStyle : {
    //           lineWidth :0,
    //           strokeColor:'rgba(0,0,0,0)',
    //         }    
    //     });
    //     shape.keyNo = shapeList[i]._echartsData._data.KeyNo;
    //     shape.zlevel = 1;
    //     shape.z = 4;
    //     shape.clickable = true;
    //     myChart.getZrender().addShape(shape);
    // }
    if (shapeList[i]._echartsData && shapeList[i]._echartsData._data.subtext) {
      shapeList[i].style.text = shapeList[i].style.text + '\n';
      var shapeY = shapeList[i].rotation[2] + 12;
      if (shapeList[i]._echartsData._data.name.length > 10) {
        shapeY = shapeList[i].rotation[2] + 16;
      }
      if (shapeList[i]._echartsData._data.Org == 2) {
        shapeY = shapeList[i].rotation[2] + 11;
      }
      if (shapeList[i]._echartsData._data.tag) {
        if (shapeList[i]._echartsData._data.name.length > 10) {
          shapeY = shapeList[i].rotation[2] + 4;
        } else {
          shapeY = shapeList[i].rotation[2] + 1;
        }
      }
      var shape = new Text({
        style: {
          x: shapeList[i].rotation[1],
          y: shapeY,
          text: shapeList[i]._echartsData._data.subtext,
          color: '#666',
          textFont: 'normal 11px 微软雅黑',
          textAlign: 'center',
          lineWidth: 0,
        },
        highlightStyle: {
          lineWidth: 0,
          color: '#666',
          strokeColor: 'rgba(255,255,255,0)',
        }
      });
      shape.zlevel = 1;
      shape.z = 5;
      shape.ndelete = true;
      shape.hoverable = false;
      myChart.getZrender().addShape(shape);
    }
    if (shapeList[i]._echartsData && shapeList[i]._echartsData._data.extend && !jietu) {
      var iconImg = '';
      var isIE11 = (!!window.ActiveXObject || "ActiveXObject" in window);
      if (shapeList[i]._echartsData._data.extend == 1) {
        if (isIE11) {
          iconImg = '/material/theme/chacha/cms/v2/images/tupu_cross.png';
        } else {
          iconImg = '/material/theme/chacha/cms/v2/images/tupu_cross.svg';
        }
      } else if (shapeList[i]._echartsData._data.extend == 2) {
        if (isIE11) {
          iconImg = '/material/theme/chacha/cms/v2/images/tupu_minus.png';
        } else {
          iconImg = '/material/theme/chacha/cms/v2/images/tupu_minus.svg';
        }

      }
      var shapeY = shapeList[i].rotation[2];
      if (shapeList[i]._echartsData._data.isTouzi) {
        shapeY = shapeY + shapeList[i].style.height / 2;
      } else {
        shapeY = shapeY - shapeList[i].style.height / 2 - 18;
      }
      var shape = new ImageShape({
        style: {
          image: iconImg,
          x: shapeList[i].rotation[1] - 9,
          y: shapeY,
          width: 18,
          height: 18

        }
      });
      shape.keyNo = shapeList[i]._echartsData._data.KeyNo;
      shape.treeId = shapeList[i]._echartsData._data.treeId;
      shape.zlevel = 1;
      shape.z = 4;
      shape.ndelete = true;
      shape.clickcom = true;
      shape.hoverable = true;
      shape.clickable = true;
      myChart.getZrender().addShape(shape);
    }
    if (shapeList[i]._echartsData && shapeList[i]._echartsData._data.editable && canEditRect && !jietu) {
      var iconImg = '';
      var isIE11 = (!!window.ActiveXObject || "ActiveXObject" in window);
      if (isIE11) {
        iconImg = '/material/theme/chacha/cms/v2/images/tupu_delete.png';
      } else {
        iconImg = '/material/theme/chacha/cms/v2/images/tupu_delete.svg';
      }
      var shapeY = shapeList[i].rotation[2];
      if (shapeList[i]._echartsData._data.isTouzi) {
        shapeY = shapeY - shapeList[i].style.height / 2 - 9;
      } else {
        shapeY = shapeY - shapeList[i].style.height / 2 - 18 + 9;
      }
      var shape = new ImageShape({
        style: {
          image: iconImg,
          x: shapeList[i].rotation[1] - 9 + 72,
          y: shapeY,
          width: 18,
          height: 18

        }
      });
      shape.zlevel = 1;
      shape.z = 20;
      shape.keyNo = shapeList[i]._echartsData._data.KeyNo;
      shape.treeId = shapeList[i]._echartsData._data.treeId;
      shape.ndelete = true;
      shape.editcom = true;
      shape.hoverable = true;
      shape.clickable = true;
      myChart.getZrender().addShape(shape);
    }
    if (shapeList[i]._echartsData && shapeList[i]._echartsData._data.kzr && shapeList[i]._echartsData._data.syr) {
      var shape = new ImageShape({
        style: {
          image: '/material/theme/chacha/cms/v2/images/tupu_kzrsbg.png',
          x: shapeList[i].rotation[1] - 75,
          y: shapeList[i].rotation[2] - shapeList[i].style.height / 2 - 38,
          width: 150,
          height: 44,
        },
        highlightStyle: {
          lineWidth: 0,
          strokeColor: '#fff',
        }
      });
      var shapeText = new Text({
        style: {
          x: shapeList[i].rotation[1],
          y: shapeList[i].rotation[2] - shapeList[i].style.height / 2 - 18,
          textFont: 'normal 11px 微软雅黑',
          text: '实际控制人\n' + '最终受益人：' + shapeList[i]._echartsData._data.syr,
          textAlign: 'center',
          color: '#fff',
          lineWidth: 0,
        },
        highlightStyle: {
          lineWidth: 0,
          strokeColor: 'rgba(255,255,255,0)',
        }
      });
      shape.ndelete = true;
      shape.zlevel = 1;
      shape.z = 8;
      shape.hoverable = false;
      shapeText.zlevel = 1;
      shapeText.z = 10;
      shapeText.ndelete = true;
      shapeText.hoverable = false;
      myChart.getZrender().addShape(shape);
      myChart.getZrender().addShape(shapeText);
    } else if (shapeList[i]._echartsData && shapeList[i]._echartsData._data.kzr) {
      var shape = new ImageShape({
        style: {
          image: '/material/theme/chacha/cms/v2/images/tupu_kzrbg.png',
          x: shapeList[i].rotation[1] - 75,
          y: shapeList[i].rotation[2] - shapeList[i].style.height / 2 - 24,
          width: 150,
          height: 30,
        },
        highlightStyle: {
          lineWidth: 0,
          strokeColor: 'rgba(255,255,255,0)',
        }
      });
      var shapeText = new Text({
        style: {
          x: shapeList[i].rotation[1],
          y: shapeList[i].rotation[2] - shapeList[i].style.height / 2 - 12,
          textFont: 'normal 11px 微软雅黑',
          text: '实际控制人',
          textAlign: 'center',
          color: '#fff',
          lineWidth: 0,
        },
        highlightStyle: {
          lineWidth: 0,
          color: '#F5A623',
          strokeColor: 'rgba(255,255,255,0)',
        }
      });
      shape.ndelete = true;
      shape.zlevel = 1;
      shape.z = 8;
      shape.hoverable = false;
      shapeText.zlevel = 1;
      shapeText.z = 10;
      shapeText.ndelete = true;
      shapeText.hoverable = false;
      myChart.getZrender().addShape(shape);
      myChart.getZrender().addShape(shapeText);

    } else if (shapeList[i]._echartsData && shapeList[i]._echartsData._data.syr) {
      var shape = new ImageShape({
        style: {
          image: '/material/theme/chacha/cms/v2/images/tupu_syrbg.png',
          x: shapeList[i].rotation[1] - 75,
          y: shapeList[i].rotation[2] - shapeList[i].style.height / 2 - 24,
          width: 150,
          height: 30,
        },
        highlightStyle: {
          lineWidth: 0,
          strokeColor: 'rgba(255,255,255,0)',
        }
      });
      var shapeText = new Text({
        style: {
          x: shapeList[i].rotation[1],
          y: shapeList[i].rotation[2] - shapeList[i].style.height / 2 - 12,
          textFont: 'normal 11px 微软雅黑',
          text: '最终受益人：' + shapeList[i]._echartsData._data.syr,
          textAlign: 'center',
          color: '#fff',
          lineWidth: 0,
        },
        highlightStyle: {
          lineWidth: 0,
          color: '#F5A623',
          strokeColor: 'rgba(255,255,255,0)',
        }
      });
      shape.ndelete = true;
      shape.zlevel = 1;
      shape.z = 8;
      shape.hoverable = false;
      shapeText.zlevel = 1;
      shapeText.z = 10;
      shapeText.ndelete = true;
      shapeText.hoverable = false;
      myChart.getZrender().addShape(shape);
      myChart.getZrender().addShape(shapeText);

    }
    if (shapeList[i]._echartsData && shapeList[i]._echartsData._data.kg) {
      var shapeY = shapeList[i].rotation[2] - shapeList[i].style.height / 2 - 21.5;
      if (shapeList[i]._echartsData._data.tag) {
        shapeY += 9;
      }
      var shapeX = shapeList[i].rotation[1] + 28
      if (shapeList[i]._echartsData._data.ratio) {
        shapeX += shapeList[i]._echartsData._data.ratio.length * 10
        if (shapeList[i]._echartsData._data.ratio.indexOf('.') != -1) {
          shapeX -= 10;
        }
      }
      var shapeText = new Text({
        style: {
          x: shapeX,
          y: shapeY,
          textFont: 'normal 11px 微软雅黑',
          text: '(控股)',
          textAlign: 'center',
          color: '#FD485E',
          lineWidth: 0,
        },
        highlightStyle: {
          lineWidth: 0,
          color: '#FD485E',
          strokeColor: 'rgba(255,255,255,0)',
        }
      });
      shapeText.zlevel = 1;
      shapeText.z = 10;
      shapeText.ndelete = true;
      shapeText.hoverable = false;
      myChart.getZrender().addShape(shapeText);
    }
    if (shapeList[i]._echartsData && shapeList[i]._echartsData._data.tag) {
      shapeList[i].style.text = shapeList[i].style.text + '\n\n';
      var shapeColor = '#FFECCE';
      var shapeTextColor = '#F5A623';
      if (shapeList[i]._echartsData._data.list) {
        shapeColor = '#DDF0FF';
        shapeTextColor = '#128bed';
      }

      var shape = new Rectangle({
        style: {
          x: shapeList[i].rotation[1] - 72.5,
          y: shapeList[i].rotation[2] + shapeList[i].style.height / 2 - 22.5,
          width: 145,
          height: 22,
          color: shapeColor,
        },
        highlightStyle: {
          lineWidth: 0,
          color: 'rgba(255,255,255,0)',
          strokeColor: '#fff',
        }
      });
      var shapeText = new Text({
        style: {
          x: shapeList[i].rotation[1] - 2,
          y: shapeList[i].rotation[2] + shapeList[i].style.height / 2 - 12,
          textFont: 'normal 12px 微软雅黑',
          text: shapeList[i]._echartsData._data.tag,
          textAlign: 'center',
          color: shapeTextColor,
          fontSize: 14,
          lineWidth: 0,
        },
        highlightStyle: {
          lineWidth: 0,
          color: shapeTextColor,
          strokeColor: 'rgba(255,255,255,0)',
        }
      });
      shape.zlevel = 1;
      shape.z = 4;
      shape.ndelete = true;
      shape.hoverable = false;
      shapeText.zlevel = 1;
      shapeText.z = 5;
      shapeText.ndelete = true;
      shapeText.hoverable = false;
      myChart.getZrender().addShape(shape);
      myChart.getZrender().addShape(shapeText);
    }
  }

  for (var i = 0; i < myChart.getZrender().getWidth() + 100; i += 300) {
    for (var j = 0; j < myChart.getZrender().getHeight() + 100; j += 228) {
      var shapeSy = new ImageShape({
        style: {
          image: '/material/theme/chacha/cms/v2/images/shuiying2.png',
          x: i,
          y: j,
          width: 300,
          height: 228
        }
      });
      shapeSy.hoverable = false;
      shapeSy.ndelete = true;
      myChart.getZrender().addShape(shapeSy);
    }
  }
}


function editTree(KeyNo, tid) {
  getNode(gudongData);
  getNode(touziData);
  var dnode;
  var dIndex;

  function getNode(data) {
    if (!data) return;
    if (data.children) {
      for (var i = 0; i < data.children.length; i++) {
        var cnode = data.children[i].children[0];
        if (cnode.treeId == tid) {
          dIndex = i;
          dnode = data;
          return;
        }
        getNode(cnode);
      }
    }
  }
  dnode.children.splice(dIndex, 1);
  if (dnode.children.length == 0) {
    dnode.children = [];
    dnode.extend = undefined;
  }
  myChart.clear();
  myChart.setOption(option);
  initZrender();
}

function troggleTree(KeyNo, tid) {
  // if(KeyNo==getQueryString("keyNo")){
  //     return;
  // }
  getNode(gudongData);
  getNode(touziData);

  function getNode(data) {
    if (!data) return;
    if (data.KeyNo && data.KeyNo == KeyNo && data.treeId == tid) {
      if (data.children) {
        data._children = data.children;
        data.children = null;
        data.extend = 1;
        //data.symbol = 'circleCross';
      } else if (data._children) {
        data.children = data._children;
        data._children = null;
        data.extend = 2;
        ajaxtouzidata(data, KeyNo);
        ajaxgudongdata(data, KeyNo);
        //data.symbol = 'circleMinus';
      }
      return;
    }
    if (data.children) {
      for (var i = 0; i < data.children.length; i++) {
        getNode(data.children[i]);
      }
    }
  }
  myChart.clear();
  myChart.setOption(option);
  initZrender();
}



function ajaxtouzidata(node, KeyNo) {

  if (!node.isTouzi || node.ajaxtouzi) {
    return;
  }
  $.ajax({
    url: INDEX_URL + 'cms_guquanmapinvestment',
    data: {
      keyNo: KeyNo
    },
    dataType: 'JSON',
    success: function (data) {
      if (data.touzi && data.touzi.DetailList.length > 0) {
        addTreeChild(node, data);
      }
    },
  })
}

function addTreeChild(node, data) {
  if (!node.children) {
    return;
  }
  $.each(node.children, function (index, vo) {
    var cnode = vo.children[0];
    $.each(data.touzi.DetailList, function (i, ndata) {
      if (ndata.KeyNo == cnode.KeyNo) {
        if (ndata.DetailList.length > 0) {
          cnode.DetailList = ndata.DetailList;
          transTree(cnode, 2);
          cnode._children = cnode.children;
          cnode.children = null;
          cnode.extend = 1;
        }

      }
    })
  })
  node.ajaxtouzi = true;
  myChart.clear();
  myChart.setOption(option);
  initZrender();
}

//动态加载股东节点
function ajaxgudongdata(node, KeyNo) {
  if (node.isTouzi || node.ajaxgudong) {
    return;
  }
  if (KeyNo == null) {
    return;
  }
  $.ajax({
    url: INDEX_URL + 'cms_guquanmapownership',
    data: {
      keyNo: KeyNo,
      level: 2,
    },
    dataType: 'JSON',
    success: function (data) {
      if (data.gudong && data.gudong.DetailList.length > 0) {
        addGudongTreeChild(node, data);
      }
    }
  })
}

function addGudongTreeChild(node, data) {
  $.each(node.children, function (index, vo) {
    var cnode = vo.children[0];
    $.each(data.gudong.DetailList, function (i, ndata) {
      if (ndata.KeyNo == cnode.KeyNo && ndata.Name.replace(/[^\X]/g, '') == cnode.Name.replace(/[^\X]/g, '')) {
        if (ndata.DetailList.length > 0) {
          cnode.DetailList = ndata.DetailList;
          transTree(cnode, 1);
          cnode._children = cnode.children;
          cnode.children = null;
          cnode.extend = 1;
        }

      }
    })
  })
  node.ajaxgudong = true;
  myChart.clear();
  myChart.setOption(option);
  initZrender(false, '');
}




function resizeScreen() {
  if (document.body.clientHeight > 700) {
    $('#screenArea').height(document.body.clientHeight - 66);
  } else if (window.iframe) {
    $('#screenArea').width(886);
    $('#screenArea').height(418);
    $('#main').width(886);
    $('#main').height(418);
  } else {
    $('#screenArea').height(640);
  }
}

function popclose(dom) {
  $(dom).parent().parent().fadeOut();
  if (showKeyNo) {
    showKeyNo = '';
  }
}

function personImgErr() {
  var name = $(".ea_name").text();
  $('#face_oss').hide();
  $('.ea_defaultImg').show();
  $('.ea_defaultImg').text(name[0]);
}

if (window.iframe) {
  $('.navi-header').hide();
  $('.mao-head').hide();
  $('.tupu-toolbar').hide();
  $('.water-mark').css('bottom', '10px');
  timeoutRoam();
}

function timeoutRoam() {
  var roamTimer;
  var roamed = false;
  $('#main').on('mouseenter', function (e) {
    if (!roamed) {
      roamTimer = setTimeout(function () {
        $.each(option.series, function (i, v) {
          v.roam = true;
        })
        myChart.clear();
        myChart.setOption(option);
        initZrender();
        roamed = true;
      }, 800);
    }
  })
  $('#main').on('mouseout', function (e) {
    if (roamTimer) {
      clearTimeout(roamTimer);
      roamTimer = null;
    }
    if (roamed) {
      $.each(option.series, function (i, v) {
        v.roam = 'move';
      })
      myChart.clear();
      myChart.setOption(option);
      initZrender();
      roamed = false;
    }
  })
}

function downloadimg(canvas) {
  var qual = 1;
  if (canvas.width > 3000) {
    qual = 0.5;
  } else if (canvas.width > 5000) {
    qual = 0.4;
  }
  //设置保存图片的类型
  var imgdata = canvas.toDataURL('image/jpeg', qual);
  var filename = '的股权穿透图_' + new Date().toLocaleDateString() + '.jpeg';
  post(INDEX_URL + 'cms_downloadimg?filename=' + filename, {
    img: imgdata
  });
}

function post(URL, PARAMS) {
  var temp = document.createElement("form");
  temp.action = URL;
  temp.enctype = "multipart/form-data";
  temp.method = "post";
  temp.style.display = "none";
  for (var x in PARAMS) {
    var opt = document.createElement("textarea");
    opt.name = x;
    opt.value = PARAMS[x];
    temp.appendChild(opt);
  }
  document.body.appendChild(temp);
  temp.submit();
  return temp;
}