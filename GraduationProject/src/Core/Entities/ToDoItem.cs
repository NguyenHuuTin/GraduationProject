﻿/*using Core.Events;*/
using SharedKernel.Interfaces;
using SharedKernel;

namespace Core.Entities
{
    public class ToDoItem : BaseEntity, IAggregateRoot
    {
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; }
        public bool IsDone { get; private set; }

        public void MarkComplete()
        {
            IsDone = true;

         /*   Events.Add(new ToDoItemCompletedEvent(this));*/
        }

        public override string ToString()
        {
            string status = IsDone ? "Done!" : "Not done.";
            return $"{Id}: Status: {status} - {Title} - {Description}";
        }
    }
}
