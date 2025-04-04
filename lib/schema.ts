import { z } from 'zod'

export const formSchema = z.object({
  url: z.string().nonempty('订阅链接不能为空'),
  target: z.string(),
  serverProtocol: z.string(),
  serverDomain: z.string().nonempty('后端服务地址未指定'),
  serverPort: z
    .number()
    .int()
    .gte(1, { message: '端口号不合法' })
    .lte(65535, { message: '端口号不合法' }),
  config: z.string(),
  customConfig: z.string(),
  include: z.string(),
  exclude: z.string(),
  filename: z.string(),
  interval: z.number().int().gte(0, { message: '更新间隔不合法' }),
  emoji: z.boolean(),
  tfo: z.boolean(),
  udp: z.boolean(),
  sort: z.boolean(),
  fdn: z.boolean(),
  scv: z.boolean(),
  expand: z.boolean(),
  list: z.boolean(),
})

export type FormValues = z.infer<typeof formSchema>

export const formLabelMap: { [key: string]: string } = {
  url: '订阅链接',
  target: '客户端',
  server: '后端服务',
  config: '远程配置',
  include: '包含节点',
  exclude: '排除节点',
  filename: '生成订阅文件名称',
  interval: '更新间隔「秒」为0则不更新',
  emoji: 'Emoji',
  tfo: 'TCP Fast Open',
  udp: 'UDP',
  sort: '节点排序',
  fdn: '过滤无效节点',
  scv: '关闭证书检查',
  expand: '置入规则',
  list: '输出为节点列表',
}

export const clientList = [
  {
    label: 'Surge',
    value: 'surge&ver=4',
  },
  {
    label: 'Clash',
    value: 'clash',
  },
  {
    label: 'ClashR',
    value: 'clashr',
  },
  {
    label: 'Quantumult',
    value: 'quantumult',
  },
  {
    label: 'Quantumult X',
    value: 'quantumultx',
  },
  {
    label: 'Loon',
    value: 'loon',
  },
  {
    label: 'Mellow',
    value: 'mellow',
  },
  {
    label: 'SS(SIP002)',
    value: 'ss',
  },
  {
    label: 'SS(软件订阅)',
    value: 'sssub',
  },
  {
    label: 'SSD',
    value: 'ssd',
  },
  {
    label: 'SSR',
    value: 'ssr',
  },
  {
    label: 'Surfboard',
    value: 'surfboard',
  },
  {
    label: 'Surge 2',
    value: 'surge&ver=2',
  },
  {
    label: 'Surge 3',
    value: 'surge&ver=3',
  },
  {
    label: 'Trojan',
    value: 'trojan',
  },
  {
    label: 'V2Ray',
    value: 'v2ray',
  },
]

export const configList = [
  {
    label: '本地配置',
    value: '',
  },
  {
    label: 'ACL4SSR Online',
    value:
      'https%3A%2F%2Fraw.githubusercontent.com%2FACL4SSR%2FACL4SSR%2Fmaster%2FClash%2Fconfig%2FACL4SSR_Online.ini',
  },
  {
    label: 'ACL4SSR Online Full',
    value:
      'https%3A%2F%2Fraw.githubusercontent.com%2FACL4SSR%2FACL4SSR%2Fmaster%2FClash%2Fconfig%2FACL4SSR_Online_Full.ini',
  },
  {
    label: '自定义远程配置',
    value: 'custom',
  },
]
