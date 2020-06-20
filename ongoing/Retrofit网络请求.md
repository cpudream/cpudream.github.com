Retrofit 是 Square 公司推出的一个 Http 框架。主要用于 Android 和 Java。他会把每个 API 网络请求变成一个 Java 接口。 同时 Retrofit 又是 Restful 网络请求框架的封装。他只是请求框架的封装，不是网络请求。

Application layer  <====> Retrofit layer  <=====> okhttp layer  <===>server

Application layer通过retrofit layer封装请求参数，头部，url等配件信息，通过okhttp layer完成后续的请求数据。在服务端返回给数据给okhttp layer之后，会装原始结果交给retrofit layer ，retrofit 根据用户需要交给application layer。
Retrofit2.0内置了Okhttp,这样 Retrofit 专注于接口的封装工作，Okhttp 专注于网络请求高校工作。两者分工更能提高效率，


### Retrofit简单使用

1. 去看观望的例子。

```Java
public interface GitHubService{
  @GET("users/{users/{user}}/repos")   
  Call<List<Repo>> listRepos(@Path("user") String user);  
}
```
上面的注解跟据翻译我们就知道是一个 get 请求的路径。｛user｝是动态变化的，如果传的参数是空就用@Path里面的代替。 返回的 Call 代表一个真正的网络请求。

2. 创建 Retrofit,通过Builder模式。
```Java
Retrofit retofit = new Retrofit.Builder()
    .baseUrl("https://api.github.com/")
    .addConverterFactory(GsonConverterFactory.create())
    .build();
```
addConverterFactory 用于创建 ConverterFactory 他的作用就是将我们的反回的 response 转换成 Java 对象 ，显示在我们的UI上

addConverterFactory 和适配器非常重要。

3. 调用retrofit.create 获取GitHubServices，然后请求网络
```Java
GitHubService service = retrofit.create(GitHubService.class);
Call repos = (Call)service.listPrepos("xxx");
```
上面是官网的例子，下面是更详细的例子。

retrofit网络请求的7个步骤，

1. gradle 里面添加Retrofit依赖，添加网络权限
2. 定义 接收服务器返回Response实体一类，也就是Bean
3. 创建一个用于描述网络请求的接口， 因为 retrofit 装所有的网络请求描述成了一个接口，用注解描述网络请求参数。里面是通过动态代理装注解翻译成了一个个http请求，最后执行。
4. 创建一个Retrofit实例，addConverterFactory 数据解析器， 支持不同类型的数据模式，json, xml,在grdle中添加相应的依赖， addCallAdapterFactory,表示网络请求适配器，支持多种适配器java8和rxjava等必须添加依赖。
5. 创建网络请求的接口实例，通过create
6. 发送网络请求 enqueue等
7. 处理服务器返回 的数据

### 动态代理的知识
#### 静态代理
代理模式： 为其他对象提供一种代理，作用用以控制对像的访问，代理代理，就是代替别人做他们想做的事情， 海外购物
画uml，需要三个角色：抽象对象角色，目标对象角色，代理对象角色。
抽象对象角色，声明了目标对象角色和代理对象角色中的共同接口，可以在任何使用目标对象角色的地方使用proxyObject使用
目标对象角色：定义代理对象所代表的目标对象
代理对象角色：串连整个代理模式的角色，持有了目标对象角色，可以在任何时候操作目标对象角色。
对已有方法进行改进，前后加东西，可以用代理模式。
### 动态代理
1. 无侵入， 争强方法
动态代理：代理类在程序运行时创建的代理方式。
两种动态代理的写法
1. jdk动态代理： 只能为接口创建代理
2. CGLIB代理

下面是代理类实现了 InvocationHandler 变重写了 invoke方法
```Java
public class Proxy implements InvocationHandler{
  private Object target;   //要代理的真实对象;
  public Proxy(Subject target){
    this.target = target;
  }
  public Object invoke(Object proxy, Method method, Object[] args) throws Throwable{
    .....
    method.invoke(target, args);
    .......
  }
}
```

1.InvocationHandler接口，每个代理对象实现程序的时候一定要实现的接口。当我们通过代理调用方法的时候，程序会将方法指派到调用处的invoke方法
三个参数，proxy表示， Method表示，args表示
