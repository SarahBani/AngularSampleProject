﻿using Core.DomainModel.Entities;
using Core.DomainModel.Collections;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Runtime.CompilerServices;

namespace Core.DomainService
{
    public static class Extension
    {

        public static bool IsAssignedGenericType(this Type type, Type genericType)
        {
            foreach (var interfaceType in type.GetInterfaces())
            {
                if (interfaceType.IsGenericType && interfaceType.GetGenericTypeDefinition() == genericType)
                {
                    return true;
                }
            }
            if (type.IsGenericType && type.GetGenericTypeDefinition() == genericType)
            {
                return true;
            }
            Type baseType = type.BaseType;
            if (baseType == null)
            {
                return false;
            }
            return baseType.IsAssignedGenericType(genericType);
        }

        public static Type GetBaseDeclaringType(this MethodBase method)
        {
            Type declaringType = method.DeclaringType;
            while (declaringType.DeclaringType != null)
            {
                declaringType = declaringType.DeclaringType;
            }
            return declaringType;
        }

        public static MethodBase GetRealMethod(this MethodBase method)
        {
            Type generatedType = method.DeclaringType;
            Type originalType = generatedType.DeclaringType;
            if (originalType != null)
            {
                var matchingMethods =
                    from methodInfo in originalType.GetMethods()
                    let attr = methodInfo.GetCustomAttribute<AsyncStateMachineAttribute>()
                    where attr != null && attr.StateMachineType == generatedType
                    select methodInfo;

                if (matchingMethods.Any())
                {
                    return matchingMethods.Single();
                }
                else
                {
                    return null;
                }
            }
            return method;
        }

        public static IQueryable<TEntity> SetOrder<TEntity>(this IQueryable<TEntity> query, IList<Sort> sorts)
        {
            if (sorts != null && sorts.Count() > 0)
            {
                foreach (var sort in sorts)
                {
                    var propertyExpression = Utility.GetRelatedPropertyExpression<TEntity, TEntity>(sort.SortField);

                    if (sort.SortDirection == SortDirection.ASC)
                    {
                        query = query.OrderBy(propertyExpression);
                    }
                    else
                    {
                        query = query.OrderByDescending(propertyExpression);
                    }
                }
            }
            return query;
        }

        public static IQueryable<TEntity> SetPage<TEntity>(this IQueryable<TEntity> query, Page page)
        {
            if (page != null)
            {
                query = query.Skip(page.FirstRowIndex).Take(page.Count);
            }
            return query;
        }

        public static TEntity TrimCharProperties<TEntity, TKey>(this TEntity entity)
            where TEntity : BaseEntity<TKey>
        {
            var type = typeof(TEntity);
            var properties = type.GetProperties()
             .Where(q => q.PropertyType == typeof(string) ||
                         q.PropertyType == typeof(char)); // Obtain all string & char properties

            foreach (var prop in properties) // Loop through properties
            {
                object propertyValue = prop.GetValue(entity);
                if ((propertyValue ?? string.Empty).ToString() == string.Empty)
                {
                    continue;
                }
                Type propertyType = prop.PropertyType;
                var newPropValue = Convert.ChangeType(propertyValue.ToString().Trim(), propertyType);
                prop.SetValue(entity, newPropValue);
            }
            return entity;
        }

        public static TCollection TrimCharProperties<TCollection>(this TCollection collection)
           where TCollection : BaseCollection
        {
            var type = typeof(TCollection);
            Utility.TrimCharProperties(type, collection);
            Utility.TrimCharNestedProperties(type, collection);

            return collection;
        }
        
        //public static List<TypeInfo> GetTypesAssignableTo(this Assembly assembly, Type compareType)
        //{
        //    var typeInfoList = assembly.DefinedTypes.Where(x => x.IsClass
        //                        && !x.IsAbstract
        //                        && x != compareType
        //                        && x.GetInterfaces()
        //                                .Any(i => i.IsGenericType
        //                                        && i.GetGenericTypeDefinition() == compareType))?.ToList();

        //    return typeInfoList;
        //}

        //public static void AddClassesAsImplementedInterface(
        //        this IServiceCollection services,
        //        Assembly assembly,
        //        Type compareType,
        //        ServiceLifetime lifetime = ServiceLifetime.Scoped)
        //{
        //    assembly.GetTypesAssignableTo(compareType).ForEach(type =>
        //    {
        //        foreach (var implementedInterface in type.ImplementedInterfaces)
        //        {
        //            switch (lifetime)
        //            {
        //                case ServiceLifetime.Scoped:
        //                    services.AddScoped(implementedInterface, type);
        //                    break;
        //                case ServiceLifetime.Singleton:
        //                    services.AddSingleton(implementedInterface, type);
        //                    break;
        //                case ServiceLifetime.Transient:
        //                    services.AddTransient(implementedInterface, type);
        //                    break;
        //            }
        //        }
        //    });
        //}

    }
}
