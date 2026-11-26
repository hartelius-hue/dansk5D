#!/usr/bin/env python3
"""Generér selvstændige julebannere ved hjælp af portalens originale 3D-elevmotiver.
Ovenpå lægges hyggelige håndtegnede julescener, stjerner, grangrene og sne.
Alle 4 escape rooms, 20 missioner, 5 spil og 2 værksteder får egne billeder.
"""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter, ImageEnhance
from math import sin, cos, pi
import random

BASE = Path(__file__).resolve().parents[1]
OUT = BASE/"jul"/"assets"
OUT.mkdir(parents=True, exist_ok=True)

ROOMS = ["bogen","brevet","klokken","gaven"]
GAMES = ["ordjagt","ordkaeder","saetninger","synonymer","julequiz"]
SRC={
 "hero":"hero-5d.webp",
 "bogen":"topic-gys.webp",
 "brevet":"topic-kilde.webp",
 "klokken":"topic-genre.webp",
 "gaven":"topic-skriv.webp",
 "ordjagt":"game-wordle.webp",
 "ordkaeder":"game-match.webp",
 "saetninger":"game-quiz.webp",
 "synonymer":"game-memory.webp",
 "julequiz":"game-maze.webp",
 "skriv":"game-write.webp",
 "onske":"topic-skriv.webp",
}
PALETTE=[
 ((13,47,63),(249,207,120)),
 ((57,34,72),(255,167,155)),
 ((24,68,70),(171,230,197)),
 ((76,42,45),(255,212,143)),
]
def crop(im,w,h):
 sw,sh=im.size
 a=max(w/sw,h/sh)
 scaled=im.resize((int(sw*a+.5),int(sh*a+.5)),Image.Resampling.LANCZOS)
 x=(scaled.width-w)//2;y=(scaled.height-h)//2
 return scaled.crop((x,y,x+w,y+h))

def star(draw,x,y,r,color):
 xy=[]
 for i in range(10):
  a=-pi/2+i*pi/5
  rad=r if i%2==0 else r*.42
  xy.append((x+cos(a)*rad,y+sin(a)*rad))
 draw.polygon(xy,fill=color)

def decoration(draw,at,size,color,kind):
 x,y=at;r=size
 if kind==0: # snefnug
  for i in range(6):
   a=pi*i/3
   dx,dy=cos(a)*r,sin(a)*r
   draw.line((x-dx,y-dy,x+dx,y+dy),fill=color,width=max(2,r//9),joint="curve")
   for s in (-1,1):
    ex,ey=x+s*dx,y+s*dy
    for side in (-1,1):
     bx=ex-s*dx*.24+side*dy*.18
     by=ey-s*dy*.24-side*dx*.18
     draw.line((ex,ey,bx,by),fill=color,width=max(2,r//10))
 elif kind==1: # gave
  draw.rounded_rectangle((x-r,y-r//2,x+r,y+r),radius=r//7,fill=(226,87,83,242),outline=(255,234,189,255),width=max(2,r//15))
  draw.rectangle((x-r,y-r//3,x+r,y-r//5),fill=(255,218,122,255))
  draw.rectangle((x-r//7,y-r//2,x+r//7,y+r),fill=(255,220,128,255))
  draw.arc((x-r//2,y-r-r//2,x+r//5,y-r//4),190,355,fill=(255,228,141,255),width=max(3,r//7))
  draw.arc((x-r//5,y-r-r//2,x+r//2,y-r//4),185,355,fill=(255,228,141,255),width=max(3,r//7))
 elif kind==2: # juletræ
  draw.polygon([(x,y-r),(x-r,y+r//2),(x+r,y+r//2)],fill=(36,120,87,255))
  draw.polygon([(x,y-r//2),(x-int(r*1.1),y+r),(x+int(r*1.1),y+r)],fill=(33,151,108,255))
  draw.rectangle((x-r//7,y+r//2,x+r//7,y+r+int(r*.28)),fill=(146,84,66,255))
  star(draw,x,y-r,r//5,(255,225,129,255))
  for dx,dy in [(-r//3,r//5),(r//3,r//3),(0,r//2)]:
   draw.ellipse((x+dx-4,y+dy-4,x+dx+4,y+dy+4),fill=(255,197,108,255))
 elif kind==3: # julestjerne
  star(draw,x,y,r,(255,216,119,255))
  star(draw,x,y,int(r*.58),(255,244,187,255))
 elif kind==4: # kanelkage
  draw.rounded_rectangle((x-r,y-r*.63,x+r,y+r*.70),radius=int(r*.30),fill=(199,120,71,255),outline=(255,215,145,255),width=4)
  draw.arc((x-r*.55,y-r*.32,x+r*.55,y+r*.32),25,300,fill=(255,243,210,255),width=4)
  draw.ellipse((x-r*.35,y-r*.10,x-r*.20,y+r*.08),fill=(255,246,214,255))
 elif kind==5: # glødende bog
  draw.rounded_rectangle((x-r,y-r*.57,x+r,y+r*.63),radius=10,fill=(252,230,183,255),outline=(255,246,212,255),width=3)
  draw.line([(x,y-r*.55),(x,y+r*.62)],fill=(130,75,60,255),width=4)
  draw.arc((x-r*.78,y-r*.36,x-r*.11,y+r*.29),220,330,fill=(142,97,82,255),width=3)
  draw.arc((x+r*.11,y-r*.36,x+r*.78,y+r*.29),205,330,fill=(142,97,82,255),width=3)

def make(key,filename,seed,ratio=(960,425),mission=None):
 rng=random.Random(seed)
 w,h=ratio
 im=Image.open(BASE/"assets"/SRC[key]).convert("RGB")
 # preserve the 3D cartoon people, recast as snowy Christmas backdrop
 im=crop(im,w,h).convert("RGBA")
 overlay=Image.new("RGBA",(w,h),(0,0,0,0))
 d=ImageDraw.Draw(overlay,"RGBA")
 p=PALETTE[seed%4]
 # Left dark gradient ensures legible live HTML text overlay on hero
 if filename=="jule-hero.webp":
  for x in range(w):
   factor=(1-x/w)**1.8
   a=int(175*factor)
   d.line([(x,0),(x,h)],fill=(*p[0],a))
 else:
  d.rounded_rectangle((8,8,w-8,h-8),radius=36,outline=(*p[1],230),width=6)
  d.rounded_rectangle((20,20,w-20,h-20),radius=26,outline=(255,255,255,95),width=2)
 # Snow, soft stars, cozy fairy lights
 for i in range(80):
  x=rng.randrange(10,w-10);y=rng.randrange(10,h-10);r=rng.randint(1,4)
  d.ellipse((x-r,y-r,x+r,y+r),fill=(246,250,255,rng.randint(70,170)))
 for x in range(26,w-10,74):
  y=18+int(5*sin(x/48))
  d.ellipse((x-5,y-5,x+5,y+5),fill=(255,225,129,230))
  d.ellipse((x-12,y-12,x+12,y+12),outline=(255,225,129,90),width=3)
 # Decorative holly garlands at the corners
 for x,y in [(27,26),(w-30,30),(30,h-30),(w-30,h-30)]:
  for i in range(3):
   dx=round(14*cos(i*2*pi/3));dy=round(14*sin(i*2*pi/3))
   d.ellipse((x+dx-12,y+dy-6,x+dx+12,y+dy+6),fill=(34,123,83,235))
  for dx,dy in [(-2,-4),(6,2),(-2,9)]:
   d.ellipse((x+dx-4,y+dy-4,x+dx+4,y+dy+4),fill=(213,61,67,255))
 if mission is not None:
  kind=(mission+seed)%6
  decoration(d,(w-120,105),43,(255,246,218,240),kind)
  star(d,w-180,65,21,(255,224,155,240))
  # Each level has its own doodle motif.
 elif filename!="jule-hero.webp":
  decoration(d,(w-110,100),45,(255,249,228,245),seed%6)
 img=Image.alpha_composite(im,overlay).convert("RGB")
 img.save(OUT/filename,"WEBP",quality=81,method=6)

make("hero","jule-hero.webp",88,ratio=(1450,650))
for i,room in enumerate(ROOMS):
 make(room,"escape-"+room+".webp",i+13)
 for step in range(1,6):
  make(room,f"escape-{room}-{step}.webp",i*15+step+20,mission=step)
for i,game in enumerate(GAMES):
 make(game,"game-"+game+".webp",47+i*3)
for i,key in enumerate(["skriv","onske"]):
 make(key,"workshop-"+key+".webp",72+i*3)
count=len(list(OUT.glob("*.webp")))
assert count==32,("Forventede 32 billeder: hero + 4 emner + 20 missioner + 5 spil + 2 skriveværksteder",count)
print("Genererede",count,"selvstændige julebannere")
