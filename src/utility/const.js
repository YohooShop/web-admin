/**
 * 页面静态配置
 * 
 */


 //右侧组件列表配置数据
export const components={
    base:[
        { 
            type:'Picture',
            name:'图片',
        },        
        { 
            type:'Video',
            name:'视频',
        },
        { 
            type:'Carousel',
            name:'轮播图',
        },
        {
            type:'IndexCube',
            name:'图片魔方',
        },
        {
            type:"IndexSearch",
            name:"搜索控件"
        }
    ],
    market:[       
        { 
            type:'Event',
            name:'事件',
            disableDrag:true,
        },
        
        {
            type:'IndexBanner',
            name:'商品轮播图',
            disableDrag:false,
        },
        {
            type:'IndexSeckill',
            name:'秒杀',
            disableDrag:false,
        },
        {
            type:'IndexNav',
            name:'快捷导航',
            disableDrag:false,
        },
        {
            type:'IndexGroupon',
            name:'团购',
            disableDrag:false,
        },
        { 
            type:'IndexGrouping',
            name:'商品组',
            disableDrag:false,
        },
        {
            type:'IndexCategory',
            name:'商品类',
            disableDrag:false,
        },
        {
            type:'IndexSubject',
            name:'专题组',
            disableDrag:false,
        },
        
        {
            type:'IndexCoupon',
            name:'购物券',
            disableDrag:false
        }
    ]
}



