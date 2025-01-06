using Application.Repositories;
using Domain.Entites.Base;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Persistence.DbContexts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata.Ecma335;
using System.Text;
using System.Threading.Tasks;

namespace Persistence.Repositories
{
    public class WriteRepository<T> : IWriteRepository<T> where T : BaseEntity
    {
        private readonly ECommerceDbContext _context;

        public WriteRepository(ECommerceDbContext context)
        {
            _context = context;
        }

        public DbSet<T> Table => _context.Set<T>();

        public async Task<bool> AddAsync(T model)
        {
         EntityEntry entityEntry = await _context.AddAsync(model);
            return entityEntry.State == EntityState.Added;
        }

        public async Task<bool> AddRangeAsync(List<T> models)
        {
             await _context.AddRangeAsync(models);
            return true;
        }

        public bool Delete(T model)
        {
         EntityEntry entityEnry =  _context.Remove(model);
            return entityEnry.State == EntityState.Deleted;
        }

        public bool DeleteRange(List<T> models)
        {
            _context.RemoveRange(models);
            return true;
        }
        public async Task<bool> DeleteAsync(string id)
        {
            T model = await Table.FirstOrDefaultAsync(x=>x.Id==Guid.Parse(id));
            return Delete(model);
        }


        public bool Update(T model)
        {
          EntityEntry entityEntry =  _context.Update(model);
            return entityEntry.State == EntityState.Modified;
        }
        public async Task<int> SaveAsync()
        => await _context.SaveChangesAsync();

    }
}
