import OSS from 'ali-oss'
export function client(data){
     //后端提供数据
     return new OSS({
         region:data.region,
         accessKeyId:data.accessKeyId,
         accessKeySecret:data.accessKeySecret,
         bucket:data.bucket
     })
}