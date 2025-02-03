﻿using Application.Services;
using Infrastructure.Operations;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Services
{
    public class FileService : IFileService
    {
        private readonly IWebHostEnvironment _webHostEnvironment;

        public FileService(IWebHostEnvironment webHostEnvironment)
        {
            _webHostEnvironment = webHostEnvironment;
        }

        public async Task<bool> CopyFileAsync(string path, IFormFile file)
        {
            try
            {
                await using FileStream fileStream = new(path, FileMode.Create, FileAccess.Write, FileShare.None, 1024 * 1024, useAsync: false);
                await file.CopyToAsync(fileStream);
                await fileStream.FlushAsync();
                return true;
            }

            catch (Exception ex)
            {
                //todo log!
                throw ex;
            }
        }

        async Task<string> FileRenameAsync(string path, string fileName, bool first = true)
        {
        string newFileName =  await  Task.Run<string>(async () =>
            {
                string extension = Path.GetExtension(fileName);

                string newFileName = string.Empty;

                if (first)
                {
                    string oldFileName = Path.GetFileNameWithoutExtension(fileName);
                    newFileName = $"{NameOperation.CharacterRegulatory(oldFileName)}{extension}";
                }
                else
                { 
                    newFileName = fileName;
                    int indexNo1 = newFileName.IndexOf('-');
                    if (indexNo1 == -1)
                    {
                        newFileName = $"{Path.GetFileNameWithoutExtension(fileName)}-2{extension}";
                    }
                    else
                    {
                        int lastIndex = 0;
                        while (true)
                        {
                            lastIndex = indexNo1;
                            indexNo1 = newFileName.IndexOf("-", indexNo1 + 1);
                            if (indexNo1 == -1)
                            {
                                indexNo1 = lastIndex;
                                break;
                            }
                        }
                        int indexNo2 = newFileName.IndexOf(".");
                        string fileNo= newFileName.Substring(indexNo1 + 1 , indexNo2 - indexNo1 -1);
                        if (int.TryParse(fileNo, out int _fileNo))
                        {
                            _fileNo++;
                            newFileName = newFileName.Remove(indexNo1 + 1, indexNo2 - indexNo1 -1)
                      .Insert(indexNo1 + 1, _fileNo.ToString());

                        } else
                            newFileName = $"{Path.GetFileNameWithoutExtension(fileName)}-2{extension}";


                    }
                
                }



                if (File.Exists(Path.Combine(path, newFileName)))
                   return await FileRenameAsync(path, newFileName, false);
                else
                    return newFileName;
            });

            return newFileName;
        }

        public async Task<List<(string fileName, string path)>> UploadAsync(string path, IFormFileCollection files)
        {
            string uploadPath = Path.Combine(_webHostEnvironment.WebRootPath, path);

            if (!Directory.Exists(uploadPath))
                Directory.CreateDirectory(uploadPath);

            List<(string fileName, string path)> datas = new();
            List<bool> results = new();
            foreach (IFormFile file in files) { 
               string newFileName = await FileRenameAsync(uploadPath, file.FileName);
              bool result =  await CopyFileAsync(Path.Combine(uploadPath, newFileName), file);
                datas.Add((newFileName, Path.Combine(uploadPath, newFileName)));
                results.Add(result);    
            }

            if (results.TrueForAll(r => r.Equals(true)))
                return datas;
            return null;
            //todo create exception
        }
    }
}
