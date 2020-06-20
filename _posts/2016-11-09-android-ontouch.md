---
layout: post
title: "onTouch onTouchEvent onClick区别联系与事件拦截"
catalog: true 
date: 2016-11-09
tags: 
    - onTouch
    - Android
---

本文源码请看[MainActivity与CustomHistogram](https://github.com/CPUdream/blog_example_demo/tree/master/Histogram)先说优先级，<font color="red">onTouch > onTouchEvent > OnClick</font>; onTouch方法是View的 OnTouchListener借口中定义的方法。当一个View绑定了OnTouchLister后，当有touch事件触发时，就会调用onTouch方法。（当把手放到View上后，onTouch方法被一遍一遍地被调用），onTouch返回是true时，表示事件被消费了，onTouchEvent,onClick全不能执行, 返回false时执行onTouchEvent, 当onTouchEvent返回super.onTouchEvent(event)， onClick会执行， 当返回false时只会执行MontionEvent.Action_down, 返回true时onTouchEvent会执行里面的全部比如down, move, up等状态但不会执行onClick,别问我怎么知道的就是这么帅。<!--more-->

### 事件拦截
1. 对于ViewGroup来说需要重写的方法有dispatchTouchEvent, onInterceptTouchEvent, onTouchEvent,
2. 对于View来说需要重写的方法有dispatchTouchEvent, onTouchEvent
3. 我们一般不会修改dispatchTouchEvent这个方法的

事件拦截结合总经理， 组长， 我自己的例子最好理解， 总经理下发任务，传递给组长，再传递给我，我做完之后上交给组长，再交给总经理。下面结合实例更好理解，这里不想写了
onInterceptTouchEvent返回值为true,拦截(不向下传递)，不继续，调用自己的onTouchEvent, 返回false调用子View的dispatchTouchEvent,onTouchEvent 返回为true，没有处理，不用审核你消费了事件，系统默认的返回但是人家里面写了调用onClick的方法。返回false，你做任务了让上级确认你没有消费了这个东西，




                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
