using Application.ViewModules.Products;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Validations.Products
{
    public class CreateProductValidation : AbstractValidator<VM_Create_Product>
    {
        public CreateProductValidation()
        {
            RuleFor(p=> p.Name)
                .NotEmpty()
                .NotNull().
                WithMessage("Name is required")
                .MaximumLength(50)
                .MinimumLength(2)
                .WithMessage("Name cannot be shorter than 2 characters or longer than 50 characters");

            RuleFor(p=>p.Stock)
                 .NotEmpty()
                .NotNull().
                WithMessage("Stock is required")
                .Must(s=> s >= 0)
                 .WithMessage("Stock cannot be shorter than  0");


            RuleFor(p => p.Price)
                 .NotEmpty()
                .NotNull().
                WithMessage("Price is required")
                .Must(p => p >= 0)
                 .WithMessage("Price cannot be shorter than  0");
        }
    }
}
