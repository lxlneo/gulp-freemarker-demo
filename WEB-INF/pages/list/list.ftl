<#include "common/head.ftl" />
<h1>the list loop</h1>
<ul>
<#list list  as item>
    <#if item.isShow == true>
        <li style="color: red;">${item.name}</li>
    <#else>
        <li style="color: blue;">${item.name}</li>
    </#if>
</#list>
</ul>
<#include "common/foot.ftl" />