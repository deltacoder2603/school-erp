from django.db import models
from django.contrib.auth.models import User

class Student(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    grade = models.CharField(max_length=10)
    section = models.CharField(max_length=10)
    
    def __str__(self):
        return f"{self.user.first_name} {self.user.last_name} - {self.grade}{self.section}"

class Teacher(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    subjects = models.CharField(max_length=255)
    
    def __str__(self):
        return f"{self.user.first_name} {self.user.last_name} - {self.subjects}"

class Subject(models.Model):
    name = models.CharField(max_length=100)
    grade = models.CharField(max_length=10)
    teacher = models.ForeignKey(Teacher, on_delete=models.SET_NULL, null=True)
    
    def __str__(self):
        return f"{self.name} - Grade {self.grade}"

class SyllabusItem(models.Model):
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    description = models.TextField()
    pdf_start_page = models.IntegerField()
    pdf_end_page = models.IntegerField()
    date_covered = models.DateField(null=True, blank=True)
    
    def __str__(self):
        return f"{self.subject.name} - {self.title}"

class Test(models.Model):
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    date = models.DateField()
    
    def __str__(self):
        return f"{self.subject.name} - {self.title}"

class Question(models.Model):
    SKILL_CHOICES = [
        ('practical', 'Practical'),
        ('analytical', 'Analytical'),
        ('theoretical', 'Theoretical'),
    ]
    
    test = models.ForeignKey(Test, on_delete=models.CASCADE)
    text = models.TextField()
    skill_type = models.CharField(max_length=20, choices=SKILL_CHOICES)
    
    def __str__(self):
        return f"{self.test.title} - {self.skill_type} Question"

class Answer(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    text = models.CharField(max_length=255)
    is_correct = models.BooleanField(default=False)
    
    def __str__(self):
        return f"{'Correct' if self.is_correct else 'Incorrect'} Answer for {self.question}"

class StudentAnswer(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    answer = models.ForeignKey(Answer, on_delete=models.CASCADE)
    
    def __str__(self):
        return f"{self.student} - {self.question}"